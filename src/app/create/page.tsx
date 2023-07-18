import { Properties } from "@/types";
import { notion } from "@/lib/notion";
import { Form } from "@/components/form";
import { handleCreateAskRow } from "../(actions)/handleCreateAskRow";
import { handleCreateOfferRow } from "../(actions)/handleCreateOfferRow";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { getIsRegistered } from "../utils/getIsRegistered";

export default async function Create() {
    const { userId } = auth();

    if (!userId) {
        redirect("/login");
    }

    const isRegistered = await getIsRegistered(userId);

    if (!isRegistered) {
        redirect("/register");
    }

    const asksTable = await notion.databases.retrieve({
        database_id: process.env.NOTION_ASKS_DATABASE_ID as string,
    });
    const asksProperties: Properties = asksTable?.properties;

    const offersTable = await notion.databases.retrieve({
        database_id: process.env.NOTION_OFFERS_DATABASE_ID as string,
    });
    const offersProperties: Properties = offersTable?.properties;

    // const handleCreateOffersRow = async (data: PropertyMap) => {
    //     "use server";
    //     createRow({
    //         properties: asksProperties,
    //         data,
    //         dbId: process.env.NOTION_OFFERS_DATABASE_ID as string,
    //         onCreate: (response) => {
    //             redirect("/");
    //         },
    //     });
    // };

    // if they are not logged in
    // redirect("/login");

    // if they are not registered
    // redirect("/register");

    return (
        <main className="flex flex-col gap-2">
            <h1 className="text-3xl">Add Ask</h1>
            <Form
                handleCreateRow={handleCreateAskRow}
                properties={asksProperties}
                handleOnComplete={"/"}
            />

            <h1 className="text-3xl">Add Offer</h1>
            <Form
                handleCreateRow={handleCreateOfferRow}
                properties={offersProperties}
                handleOnComplete={"/"}
            />
        </main>
    );
}
