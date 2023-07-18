import { cache } from "react";
import { notion } from "@/lib/notion";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

export const getCachedNotionQuery = cache(async (id: string) => {
    const directoryRaw: QueryDatabaseResponse = await notion.databases.query({
        database_id: id,
    });
    return directoryRaw;
});
