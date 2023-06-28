"use client";

import React, { useMemo } from "react";

// styled-components
import { StyledCards } from "./styledComponents";

// types
import { CardsProps } from "./types";
import { Card } from "../card/Card";

function Cards({ items }: CardsProps) {
    return (
        <StyledCards>
            {items.map((item) => (
                <Card key={item.id} item={item} />
            ))}
        </StyledCards>
    );
}

export { Cards };
