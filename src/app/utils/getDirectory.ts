import { ADMIN_ID, NAME_PROPERTY_ID } from "@/constants";
import { notion } from "@/lib/notion";
import { PropertyResponse } from "@/types";
import {
    PageObjectResponse,
    QueryDatabaseResponse,
    RichTextItemResponse,
    TextRichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

export async function getDirectory() {
    const directoryRaw: QueryDatabaseResponse = await notion.databases.query({
        database_id: process.env.NOTION_DIRECTORY_DATABASE_ID as string,
    });

    const directory = directoryRaw?.results?.map((member) => {
        const properties = (member as PageObjectResponse).properties;
        const imageUrl = (properties as any)?.["imageUrl*admin"]?.rich_text?.[0]?.text?.content;
        const userId = (properties as any)?.[ADMIN_ID]?.title?.[0]?.text?.content;
        const expandedProperties: PropertyResponse[] = Object.entries(properties).reduce(
            (prev: PropertyResponse[], [_, object]) => {
                return [...prev, { ...object }];
            },
            []
        );
        const match = expandedProperties.find((property) => property.id === NAME_PROPERTY_ID) as {
            type: "rich_text";
            rich_text: Array<RichTextItemResponse>;
            id: string;
        };
        const name = (match?.rich_text?.[0] as TextRichTextItemResponse)?.text?.content;
        return {
            imageUrl,
            userId,
            name,
        };
    });

    return directory;
}
