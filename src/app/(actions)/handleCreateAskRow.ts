"use server";
import { redirect } from "next/navigation";
import { createRow } from "./createRow";
import { PropertyMap } from "@/components/form/types";
import { notion } from "@/lib/notion";
import { Properties } from "@/types";
import { revalidatePath } from "next/cache";

export async function handleCreateAskRow(data: PropertyMap) {
    const asksTable = await notion.databases.retrieve({
        database_id: process.env.NOTION_ASKS_DATABASE_ID as string,
    });
    const asksProperties: Properties = asksTable?.properties;

    await createRow({
        properties: asksProperties,
        data,
        dbId: process.env.NOTION_ASKS_DATABASE_ID as string,
    });
    revalidatePath("/");
}
