"use server";

import { notion } from "@/lib/notion";
import { CreatePageParameters, CreatePageResponse } from "@notionhq/client/build/src/api-endpoints";
import { Properties, PropertyType, Option } from "@/types";
import { PropertyMap } from "@/components/form/types";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

// I need to dynamically create the properties based on the form data - which was in turn originally created from the database schema
// will need a similar function to the one that creates the form elements for each property
// but here it will need to help create the correct payload for the API call - looks to be keys by the type..
// is "content" always the key for the value of the property?

export async function createRow({
    properties,
    data,
    dbId,
    anonymous,
    imageUrl,
}: {
    properties: Properties;
    data: PropertyMap;
    dbId: string;
    imageUrl?: string;
    anonymous?: boolean;
}) {
    const { userId } = auth();

    if (!userId && !anonymous) {
        throw new Error("You must be signed in to add an item to your cart");
    }

    const paramsPayload = getPageParams({
        properties,
        data,
        userId: anonymous ? "" : (userId as string),
        dbId,
        imageUrl,
    });
    console.dir({ paramsPayload }, { depth: null });
    await notion.pages.create(paramsPayload);
}

function paramMap({ type, value }: { type: PropertyType; value: any }) {
    const map = {
        multi_select: () => [value],
        date: () => ({
            start: new Date(),
            // end?: string | null;
            // time_zone?: TimeZoneRequest | null;
            //
        }),
        created_time: () => ({
            start: new Date(),
            // end?: string | null;
            // time_zone?: TimeZoneRequest | null;
            //
        }),
        checkbox: () => value,
        phone_number: () => value,
        select: () => value,
        email: () => value,
        status: () => value,
        url: () => value,
        number: () => +value || null,
        title: () => {
            return [
                {
                    text: {
                        content: value,
                    },
                },
            ];
        },
        text: () => {
            return [
                {
                    text: {
                        content: value,
                    },
                },
            ];
        },
        rich_text: () => {
            return [
                {
                    text: {
                        content: value,
                    },
                },
            ];
        },
    };
    return map?.[type]?.();
}

function getPageParams({
    properties,
    data,
    userId,
    dbId,
    imageUrl,
}: {
    properties: Properties;
    data: PropertyMap;
    userId: string;
    dbId: string;
    imageUrl?: string;
}): CreatePageParameters {
    const resolvedProperties = Object.entries(properties).reduce((prev, [key, value]) => {
        const { id, type } = value || {};
        const valueFromLookup = data?.[id];

        const resolvedValue =
            (properties as any)?.[key]?.[type]?.options?.find((option: Option) => {
                return option.id === valueFromLookup;
            }) || valueFromLookup;

        if (resolvedValue && resolvedValue !== "none") {
            const payload = {
                [key]: {
                    [type]: paramMap({
                        type: type as PropertyType,
                        value: resolvedValue,
                    }),
                },
            };
            return { ...prev, ...payload };
        } else {
            return prev;
        }
    }, {});

    const resolved: any = userId
        ? {
              "userId*admin": {
                  title: [
                      {
                          text: {
                              content: userId,
                          },
                      },
                  ],
              },
          }
        : {};
    const resolvedImageUrl: any = imageUrl
        ? {
              "imageUrl*admin": {
                  rich_text: [{ text: { content: imageUrl } }],
              },
          }
        : {};

    return {
        parent: {
            database_id: dbId as string,
        },
        properties: {
            ...resolvedProperties,
            ...resolved,
            ...resolvedImageUrl,
        },
    };
}
