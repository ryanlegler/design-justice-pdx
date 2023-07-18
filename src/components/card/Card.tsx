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
    UrlPropertyItemObjectResponse,
    NumberPropertyItemObjectResponse,
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

// import { auth } from "@clerk/nextjs";

const getPropertyValue = (property: PropertyResponse) => {
    const type = property.type as PropertyType;

    // console.log("type", type);
    // console.log("property", property);

    return {
        title: () => {
            // return (property as unknown as TitlePropertyItemObjectResponse)?.title?.[0]?.text?.content; // type is wrong?
            return (property as any)?.title?.[0]?.text?.content;
        },
        text: () => {
            return (property as any)?.text?.[0]?.text?.content;
        },
        rich_text: () => {
            return (property as any)?.rich_text?.[0]?.text?.content;
        },
        select: () => {
            return (property as SelectPropertyItemObjectResponse)?.select?.name;
        },
        multi_select: () => {
            return (property as MultiSelectPropertyItemObjectResponse)?.multi_select?.map(
                (item) => <div key={item.id}>{item.name}</div>
            );
        },
        status: () => {
            return (property as StatusPropertyItemObjectResponse)?.status?.name;
        },
        date: () => {
            const rawTime = (property as DatePropertyItemObjectResponse)?.date?.start || "";
            const formattedTime = new Date(rawTime).toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
                // hour: "numeric",
                // minute: "numeric",
                // second: "numeric",
                // timeZoneName: "short",
            });
            return formattedTime;
        },
        created_time: () => {
            return (property as CreatedTimePropertyItemObjectResponse)?.created_time;
        },
        email: () => {
            return (property as EmailPropertyItemObjectResponse).email;
        },
        checkbox: () => {
            return (property as CheckboxPropertyItemObjectResponse)?.checkbox;
        },
        number: () => {
            return (property as NumberPropertyItemObjectResponse)?.number;
        },
        url: () => {
            return (property as UrlPropertyItemObjectResponse)?.url;
        },
        phone_number: () => {
            return (property as PhoneNumberPropertyItemObjectResponse)?.phone_number;
        },
    }[type]?.();
};
function Card({ item, extended }: CardProps) {
    const filteredProperties = useMemo(
        () =>
            item?.properties?.filter((property) => {
                return property.type !== "title"; // why?
            }),
        [item?.properties]
    );

    return (
        <StyledCard>
            {extended ? (
                <div className="border border-gray-200 rounded-md p-2 flex items-center justify-between">
                    <span>{item.name}</span>
                    <img src={item.imageUrl} className="w-6 h-6 rounded-full" />
                </div>
            ) : null}

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
