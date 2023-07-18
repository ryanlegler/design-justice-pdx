// import { Cards } from "@/components/cards";
// import { notion } from "@/lib/notion";
// import { Item, PropertyResponse } from "@/types";
// import {
//     PageObjectResponse,
//     QueryDatabaseResponse,
// } from "@notionhq/client/build/src/api-endpoints";

// export default async function Directory() {
//     const directoryRaw: QueryDatabaseResponse = await notion.databases.query({
//         database_id: process.env.NOTION_DIRECTORY_DATABASE_ID as string,
//     });

//     const items: Item[] = directoryRaw.results.map((member) => {
//         const properties = (member as PageObjectResponse).properties;
//         const expandedProperties: PropertyResponse[] = Object.entries(properties).reduce(
//             (prev: PropertyResponse[], [_, object]) => {
//                 return [...prev, { ...object }];
//             },
//             []
//         );
//         return {
//             id: member.id,
//             properties: expandedProperties,
//         };
//     });

//     return (
//         <main className="flex flex-col gap-2">
//             <h1 className="text-3xl">Directory</h1>
//             <Cards items={items} />
//         </main>
//     );
// }
