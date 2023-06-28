import React, { useMemo } from "react";
// styled-components
import { StyledCard } from "./styledComponents";

// types
import { CardProps } from "./types";
import { PropertyResponse, PropertyType } from "@/types";
import {
    SelectPropertyItemObjectResponse,
    MultiSelectPropertyItemObjectResponse,
    StatusPropertyItemObjectResponse,
    DatePropertyItemObjectResponse,
    EmailPropertyItemObjectResponse,
    PhoneNumberPropertyItemObjectResponse,
    CheckboxPropertyItemObjectResponse,
    FilesPropertyItemObjectResponse,
    CreatedByPropertyItemObjectResponse,
    CreatedTimePropertyItemObjectResponse,
    LastEditedByPropertyItemObjectResponse,
    LastEditedTimePropertyItemObjectResponse,
    FormulaPropertyItemObjectResponse,
    TitlePropertyItemObjectResponse,
    RichTextPropertyItemObjectResponse,
    PeoplePropertyItemObjectResponse,
    RelationPropertyItemObjectResponse,
    RollupPropertyItemObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

const getPropertyValue = (property: PropertyResponse) => {
    const type = property.type as PropertyType;

    console.log("type", type);
    console.log("property", property);

    return {
        select: () => {
            return (property as SelectPropertyItemObjectResponse)?.select?.name;
        },
        multi_select: () => {
            return "foo";
        },
        status: () => {
            return "foo";
        },
        date: () => {
            return "foo";
        },
        created_time: () => {
            return "foo";
        },
        title: () => {
            // return (property as unknown as TitlePropertyItemObjectResponse)?.title?.[0]?.text?.content;
            return (property as any)?.title?.[0]?.text?.content;
        },
        email: () => {
            return (property as EmailPropertyItemObjectResponse).email;
        },
        checkbox: () => {
            return "foo";
        },
        text: () => {
            return (property as any)?.text?.[0]?.text?.content;
        },
        rich_text: () => {
            return (property as any)?.rich_text?.[0]?.text?.content;
        },
        number: () => {
            return "foo";
        },
        phone_number: () => {
            return (property as any)?.phone_number;
        },
    }[type]?.();
};
function Card({ item }: CardProps) {
    const filteredProperties = useMemo(
        () =>
            item?.properties?.filter((property) => {
                return property.type !== "title";
            }),
        [item?.properties]
    );

    return (
        <StyledCard>
            {filteredProperties?.map((property: PropertyResponse) => {
                return (
                    <div key={property.id}>
                        <span>{getPropertyValue(property)}</span>
                    </div>
                );
            })}
        </StyledCard>
    );
}

export { Card };
