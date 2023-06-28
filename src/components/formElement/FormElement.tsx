import React from "react";
import { FormElementProps } from "./types";
import { useFormElement } from "@/components/formElement/useFormElement";

export function FormElement({ property, register }: FormElementProps) {
    const { element } = useFormElement({ property, register });
    return <>{element}</>;
}
