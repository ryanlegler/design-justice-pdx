import { getFilteredAsks } from "./getFilteredAsks";
import { getFilteredOffers } from "./getFilteredOffers";
import { Cards } from "@/components/cards";
import { notion } from "@/lib/notion";
import { Item, PropertyResponse } from "@/types";
import { auth } from "@clerk/nextjs";
import {
    PageObjectResponse,
    QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { getDirectory } from "./getDirectory";

export async function getHydratedItems(raw: QueryDatabaseResponse): Promise<Item[]> {
    const directory = await getDirectory();

    const results: Item[] = raw.results.map((ask) => {
        const userId = (ask as any)?.properties?.["userId*admin"]?.title?.[0]?.text?.content;
        const { imageUrl, name } = directory?.find((item) => item.userId === userId) || {};
        const properties = (ask as PageObjectResponse).properties;
        const expandedProperties: PropertyResponse[] = Object.entries(properties).reduce(
            (prev: PropertyResponse[], [_, object]) => {
                return [...prev, { ...object }];
            },
            []
        );
        return {
            id: ask.id,
            properties: expandedProperties,
            userId,
            imageUrl,
            name,
        };
    });

    return results;
}
