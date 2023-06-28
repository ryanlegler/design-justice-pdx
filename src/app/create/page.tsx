import { Properties } from "@/types";
import { notion } from "@/lib/notion";
import { Form } from "@/components/form";
import { createRow } from "../(actions)/createRow";

export default async function Home() {
    const asksTable = await notion.databases.retrieve({
        database_id: process.env.NOTION_ASKS_DATABASE_ID as string,
    });
    const asksProperties: Properties = asksTable?.properties;

    const offersTable = await notion.databases.retrieve({
        database_id: process.env.NOTION_OFFERS_DATABASE_ID as string,
    });
    const offersProperties: Properties = offersTable?.properties;
    return (
        <main className="flex flex-col gap-2">
            <h1 className="text-3xl">Add Ask</h1>
            <Form
                dbId={process.env.NOTION_ASKS_DATABASE_ID as string}
                properties={asksProperties}
                createRow={createRow}
            />

            <h1 className="text-3xl">Add Offer</h1>
            <Form
                dbId={process.env.NOTION_OFFERS_DATABASE_ID as string}
                properties={offersProperties}
                createRow={createRow}
            />
        </main>
    );
}
