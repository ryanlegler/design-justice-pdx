"use client";
import React, { use, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

//components
import { FormElement } from "../formElement";
import { Button } from "../button";

// styled-components
import { StyledForm } from "./styledComponents";

// types
import { FormProps, PropertyMap } from "./types";

// hooks
import { usePropertyCollection } from "./hooks/usePropertyCollection";

function Form({ properties, handleCreateRow, redirectPath }: FormProps) {
    const router = useRouter();
    const { register, handleSubmit, formState } = useForm({});
    const { isSubmitted } = formState;
    const propertyCollection = usePropertyCollection(properties);

    const handleCreateRowCallback = useCallback(
        async (data: PropertyMap) => {
            await handleCreateRow?.(data);
        },
        [handleCreateRow]
    );

    useEffect(() => {
        if (isSubmitted && redirectPath) {
            router.push(redirectPath);
        }
    }, [isSubmitted, router, redirectPath]);

    return (
        <>
            {isSubmitted ? (
                <div>
                    Success! Your Information has been submitted.
                    <span> You will redirected shortly...</span>
                </div>
            ) : (
                <StyledForm
                    onSubmit={handleSubmit((data: PropertyMap) => {
                        handleCreateRowCallback?.(data);
                    })}
                >
                    {propertyCollection.map((property) => (
                        <FormElement key={property.id} property={property} register={register} />
                    ))}

                    <div className="flex flex-grow-0 justify-end mt-2">
                        <Button type="submit">Submit</Button>
                    </div>
                </StyledForm>
            )}
        </>
    );
}

export { Form };
