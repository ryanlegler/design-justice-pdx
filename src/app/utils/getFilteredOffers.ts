import { notion } from "@/lib/notion";
export async function getFilteredOffers(userId: string) {
    return await notion.databases.query({
        database_id: process.env.NOTION_OFFERS_DATABASE_ID as string,
        filter: {
            property: "userId*admin",
            title: {
                equals: userId,
            },
        },
    });
}
