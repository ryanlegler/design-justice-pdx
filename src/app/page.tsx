import { Properties } from "@/types";
import { notion } from "@/lib/notion";
import { Form } from "@/components/form";
import { createRow } from "./(actions)/createRow";

export default async function Home() {
    const table = await notion.databases.retrieve({
        database_id: process.env.NOTION_DIRECTORY_DATABASE_ID as string,
    });
    const properties: Properties = table?.properties;
    return (
        <main className="flex flex-col gap-2">
            <h1 className="text-3xl">Register</h1>
            <Form
                properties={properties}
                createRow={createRow}
                dbId={process.env.NOTION_DIRECTORY_DATABASE_ID as string}
            />
        </main>
    );
}
