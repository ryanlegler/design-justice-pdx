"use client";
import React from "react";
import { useForm } from "react-hook-form";

//components
import { FormElement } from "../formElement";
import { Button } from "../button";

// styled-components
import { StyledForm } from "./styledComponents";

// types
import { FormProps, PropertyMap } from "./types";
import { Property } from "@/types";

function Form({ properties, createRow, dbId }: FormProps) {
    const { register, handleSubmit } = useForm({});

    const propertyCollection: Property[] = Object.keys(properties)
        .map((key) => ({
            ...properties[key],
        }))
        .filter((property) => {
            return !property.name.includes("*admin");
        })
        .sort((a: Property, b: Property) => {
            // sort by *order=0

            const aNameSegments = a.name.split("*");
            const aOrder = aNameSegments
                .find((segment) => segment.includes("order="))
                ?.replace("order=", "");

            const bNameSegments = b.name.split("*");
            const bOrder = bNameSegments
                .find((segment) => segment.includes("order="))
                ?.replace("order=", "");

            if (aOrder && bOrder) {
                return parseInt(aOrder) - parseInt(bOrder);
            } else {
                return 0;
            }
        });

    // const onSubmit = (data: PropertyMap) => {
    //     console.log("onSubmit");
    //     startTransition(() => createRow({ properties, data }));
    // };

    // console.log("propertyCollection", propertyCollection);

    return (
        <StyledForm
            onSubmit={handleSubmit((data: PropertyMap) => createRow({ properties, data, dbId }))}
        >
            {propertyCollection.map((property) => (
                <FormElement key={property.id} property={property} register={register} />
            ))}

            <div className="flex flex-grow-0 justify-end mt-2">
                <Button type="submit">Submit</Button>
            </div>
        </StyledForm>
    );
}

export { Form };
