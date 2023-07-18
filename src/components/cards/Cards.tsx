"use client";

import React, { useMemo } from "react";

// styled-components
import { StyledCards } from "./styledComponents";

// types
import { CardsProps } from "./types";
import { Card } from "../card/Card";
// import { UserButton } from "@clerk/nextjs";

function Cards({ items, extended }: CardsProps) {
    return (
        <StyledCards>
            {items.map((item) => (
                <Card extended={extended} key={item.id} item={item} />
            ))}
        </StyledCards>
    );
}

export { Cards };
