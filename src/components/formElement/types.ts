import { Property } from "@/types";
import { FieldValues, UseFormRegister } from "react-hook-form";

export type FormElementProps = {
    register: UseFormRegister<FieldValues>;
    property: Property;
};
