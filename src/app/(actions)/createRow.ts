"use server";

import { notion } from "@/lib/notion";
import { CreatePageParameters } from "@notionhq/client/build/src/api-endpoints";
import { Properties, PropertyType, Option } from "@/types";
import { PropertyMap } from "@/components/form/types";
import { auth } from "@clerk/nextjs";

// I need to dynamically create the properties based on the form data - which was in turn originally created from the database schema
// will need a similar function to the one that creates the form elements for each property
// but here it will need to help create the correct payload for the API call - looks to be keys by the type..
// is "content" always the key for the value of the property?

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
        checkbox: () => false,
        phone_number: () => value,
        select: () => value,
        email: () => value,
        status: () => value,
        number: () => value,
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
}: {
    properties: Properties;
    data: PropertyMap;
    userId: string;
    dbId: string;
}): CreatePageParameters {
    console.log("dbId", dbId);
    const resolvedProperties = Object.entries(properties).reduce((prev, [key, value]) => {
        const { id, type } = value || {};
        const valueFromLookup = data?.[id];
        const resolvedValue =
            (properties as any)?.[key]?.[type]?.options?.find((option: Option) => {
                return option.id === valueFromLookup;
            }) ||
            valueFromLookup ||
            "missing";

        const payload = {
            [key]: {
                [type]: paramMap({
                    type: type as PropertyType,
                    value: resolvedValue,
                }),
            },
        };
        return { ...prev, ...payload };
    }, {});

    return {
        parent: {
            database_id: dbId as string,
        },
        properties: {
            ...resolvedProperties,
            "userId*admin": {
                title: [
                    {
                        text: {
                            content: userId,
                        },
                    },
                ],
            },
        },
    };
}
export async function createRow({
    properties,
    data,
    dbId,
}: {
    properties: Properties;
    data: PropertyMap;
    dbId: string;
}) {
    const { userId } = auth();

    if (!userId) {
        throw new Error("You must be signed in to add an item to your cart");
    }

    const paramsPayload = getPageParams({ properties, data, userId, dbId });
    console.dir({ paramsPayload }, { depth: null });
    const response = await notion.pages.create(paramsPayload);
}
