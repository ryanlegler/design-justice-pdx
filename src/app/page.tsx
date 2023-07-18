import { Cards } from "@/components/cards";
import { notion } from "@/lib/notion";

import { auth } from "@clerk/nextjs";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

import { getFilteredItems } from "./utils/getFilteredItems";
import { getHydratedItems } from "./utils/getHydratedItems";
import { getCachedNotionQuery } from "./utils/getCachedNotionQuery";

export default async function View() {
    const { userId } = auth();
    const rawAsks = await getCachedNotionQuery(process.env.NOTION_ASKS_DATABASE_ID as string);
    const asks = await getHydratedItems(rawAsks);
    const rawOffers = await getCachedNotionQuery(process.env.NOTION_OFFERS_DATABASE_ID as string);
    const offers = await getHydratedItems(rawOffers);
    const filtered = await getFilteredItems(userId || "");
    const extended = !!userId && !!filtered?.length;

    return (
        <main className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl">Asks</h1>
                <Cards extended={extended} items={asks} />
            </div>
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl">Offers</h1>
                <Cards extended={extended} items={offers} />
            </div>
        </main>
    );
}
