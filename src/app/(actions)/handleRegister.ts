"use server";
// import { redirect } from "next/navigation";
import { createRow } from "./createRow";
import { PropertyMap } from "@/components/form/types";
import { notion } from "@/lib/notion";
import { Properties } from "@/types";
import { auth, clerkClient } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export async function handleRegister(data: PropertyMap) {
    const { userId } = auth();
    const user = await clerkClient.users.getUser(userId as string);

    const table = await notion.databases.retrieve({
        database_id: process.env.NOTION_DIRECTORY_DATABASE_ID as string,
    });
    const properties: Properties = table?.properties;

    await createRow({
        properties: properties,
        data,
        dbId: process.env.NOTION_DIRECTORY_DATABASE_ID as string,
        imageUrl: user.imageUrl || "",
    });

    revalidatePath("/register");
}
