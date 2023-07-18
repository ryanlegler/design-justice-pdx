import { notion } from "@/lib/notion";
export async function getIsRegistered(userId: string): Promise<boolean> {
    const data = await notion.databases.query({
        database_id: process.env.NOTION_DIRECTORY_DATABASE_ID as string,
        filter: {
            property: "userId*admin",
            title: {
                equals: userId,
            },
        },
    });

    return data.results.length > 0;
}
