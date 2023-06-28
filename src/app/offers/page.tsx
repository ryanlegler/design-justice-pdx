import { Cards } from "@/components/cards";
import { notion } from "@/lib/notion";
import { Item, PropertyResponse } from "@/types";
import {
    PageObjectResponse,
    QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";

export default async function Offers() {
    const asksRaw: QueryDatabaseResponse = await notion.databases.query({
        database_id: process.env.NOTION_OFFERS_DATABASE_ID as string,
    });

    const items: Item[] = asksRaw.results.map((ask) => {
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
        };
    });

    return (
        <main className="flex flex-col gap-2">
            <h1 className="text-3xl">Asks</h1>
            <Cards items={items} />
        </main>
    );
}
