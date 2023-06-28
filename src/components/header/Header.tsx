import React from "react";
import Image from "next/image";

import { currentUser, SignedIn, SignedOut, SignIn, SignInButton, UserButton } from "@clerk/nextjs";

// styled-components
import { StyledHeader, StyledImageWrap } from "./styledComponents";

// types
import { HeaderProps } from "./types";
import Link from "next/link";

async function Header({}: HeaderProps) {
    // const user = await currentUser();
    // const email = user?.emailAddresses?.[0]?.emailAddress;
    return (
        <StyledHeader>
            <StyledImageWrap>
                <Link href="/">
                    <Image
                        src="/images/DJPDX_logo.png"
                        alt="Logo"
                        fill
                        style={{
                            objectFit: "contain",
                            objectPosition: "center",
                        }}
                        priority
                    />
                </Link>
            </StyledImageWrap>

            <div className="flex gap-10">
                <Link href="/">Register</Link>
                <Link href="/edit">My Asks/Offers</Link>
                <Link href="/directory">Directory</Link>
                <Link href="/create">Add New Ask / Offer</Link>
            </div>

            <SignedIn>
                {/* Mount the UserButton component */}
                {/* <div className="flex gap-2 items-center"> */}
                {/* <div>{email}</div> */}
                <UserButton afterSignOutUrl="/" />
                {/* </div> */}
            </SignedIn>
            <SignedOut>
                {/* Signed out users get sign in button */}
                <SignInButton />
            </SignedOut>
        </StyledHeader>
    );
}

export { Header };
