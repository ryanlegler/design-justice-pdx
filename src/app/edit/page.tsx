import { Cards } from "@/components/cards";
import { notion } from "@/lib/notion";
import { Item, PropertyResponse } from "@/types";
import { auth } from "@clerk/nextjs";
import {
    PageObjectResponse,
    QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";

// TODO these are wrong now
const ASKS_USER_ID = "%7CVUw";
const OFFERS_USER_ID = "%7CVUw";

export default async function Edit() {
    const { userId } = auth();

    const asksRaw: QueryDatabaseResponse = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID as string,
    });

    const asks: Item[] = asksRaw.results
        .map((ask) => {
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
        })
        .filter((item) => {
            console.log("item", JSON.stringify(item, null, 2));
            const userIdProperty = item.properties.find((property) => property.id === "title");
            const matches = (userIdProperty as any)?.title?.[0]?.text?.content === userId;
            return matches;
        });

    // TODO abstract this out
    const offersRaw: QueryDatabaseResponse = await notion.databases.query({
        database_id: process.env.NOTION_OFFERS_DATABASE_ID as string,
    });

    const offers: Item[] = offersRaw.results
        .map((ask) => {
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
        })
        .filter((item) => {
            const userIdProperty = item.properties.find((property) => property.id === "title");
            const matches = (userIdProperty as any)?.title?.[0]?.text?.content === userId;
            return matches;
        });

    return (
        <main className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl">Asks</h1>
                <Cards items={asks} />
            </div>
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl">Offers</h1>
                <Cards items={offers} />
            </div>
        </main>
    );
}
