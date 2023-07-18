import { Properties } from "@/types";
import { notion } from "@/lib/notion";
import { Form } from "@/components/form";
import { createRow } from "../(actions)/createRow";

export default async function Home() {
    const debugTable = await notion.databases.retrieve({
        database_id: process.env.NOTION_DEBUG_DATABASE_ID as string,
    });
    const debugProperties: Properties = debugTable?.properties;

    return (
        <main className="flex flex-col gap-2">
            <h1 className="text-3xl">DEBUG</h1>
            <Form
                anonymous
                dbId={process.env.NOTION_DEBUG_DATABASE_ID as string}
                properties={debugProperties}
                createRow={createRow}
            />
        </main>
    );
}
