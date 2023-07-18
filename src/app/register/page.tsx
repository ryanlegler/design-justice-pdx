import { Properties } from "@/types";
import { notion } from "@/lib/notion";
import { Form } from "@/components/form";

import { handleRegister } from "../(actions)/handleRegister";
import { getIsRegistered } from "../utils/getIsRegistered";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Register() {
    const table = await notion.databases.retrieve({
        database_id: process.env.NOTION_DIRECTORY_DATABASE_ID as string,
    });
    const properties: Properties = table?.properties;

    // if we don't have an auth id we need to login -- middle ware should actually handle this ??
    const { userId } = auth();
    if (!userId) {
        redirect("/login");
    }

    if (userId) {
        const isRegistered = await getIsRegistered(userId);
        if (isRegistered) {
            redirect("/create");
        }
    }

    return (
        <main className="flex flex-col gap-2">
            <h1 className="text-3xl">Register</h1>
            <Form handleCreateRow={handleRegister} properties={properties} />
        </main>
    );
}
