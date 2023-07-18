import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

// we send a user here if they are not logged in when trying to create an ask or offer
export default async function Login() {
    const { userId } = auth();

    // if we detect they are now logged in we redirect them back to the create page
    if (userId) {
        redirect("/create");
    }

    return <main className="flex flex-col gap-2"></main>;
}
