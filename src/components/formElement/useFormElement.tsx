import { useCallback, useMemo } from "react";
import { Property, PropertyType, Option } from "@/types";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { Select } from "@/components/select";
import { StyledFormGroup, StyledInput } from "@/components/styledComponents";

export function useFormElement({
    property,
    register,
}: {
    property: Property;
    register: UseFormRegister<FieldValues>;
}) {
    const getFormElement = useCallback(
        (property: Property) => {
            const { name: raw, id } = property;

            const nameSegments = raw.split("*");
            const name = nameSegments?.[0] || raw;
            const required = nameSegments.some((segment) => segment === "required");
            const type = property.type as PropertyType;
            const options = (property as any)?.[type]?.options as Option[]; // fix any
            return {
                select: () => {
                    return (
                        <Select
                            required={required}
                            label={name}
                            options={options}
                            {...register(id)}
                        />
                    );
                },
                multi_select: () => {
                    return (
                        <Select
                            required={required}
                            label={name}
                            options={options}
                            {...register(id)}
                        />
                    );
                },
                status: () => {
                    return (
                        <Select
                            required={required}
                            label={name}
                            options={options}
                            {...register(id)}
                        />
                    );
                },
                date: () => {
                    return (
                        <StyledFormGroup>
                            {name}
                            <StyledInput required={required} type="date" {...register(id)} />
                        </StyledFormGroup>
                    );
                },
                created_time: () => {
                    return (
                        <StyledFormGroup>
                            {name}
                            <StyledInput required={required} type="date" {...register(id)} />
                        </StyledFormGroup>
                    );
                },
                title: () => {
                    return (
                        <StyledFormGroup>
                            {name}
                            <StyledInput required={required} type="text" {...register(id)} />
                        </StyledFormGroup>
                    );
                },
                email: () => {
                    return (
                        <StyledFormGroup>
                            {name}
                            <StyledInput required={required} type="email" {...register(id)} />
                        </StyledFormGroup>
                    );
                },
                checkbox: () => {
                    return (
                        <StyledFormGroup>
                            {name}
                            <StyledInput required={required} type="checkbox" {...register(id)} />
                        </StyledFormGroup>
                    );
                },
                text: () => {
                    return (
                        <StyledFormGroup>
                            {name}
                            <StyledInput required={required} type="text" {...register(id)} />
                        </StyledFormGroup>
                    );
                },
                rich_text: () => {
                    return (
                        <StyledFormGroup>
                            {name}
                            <StyledInput required={required} type="text" {...register(id)} />
                        </StyledFormGroup>
                    );
                },
                number: () => {
                    return (
                        <StyledFormGroup>
                            {name}
                            <StyledInput required={required} type="text" {...register(id)} />
                        </StyledFormGroup>
                    );
                },
                phone_number: () => {
                    return (
                        <StyledFormGroup>
                            {name}
                            <StyledInput
                                required={required}
                                // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                type="tel"
                                {...register(id)}
                            />
                        </StyledFormGroup>
                    );
                },
            }[type]?.();
        },
        [register]
    );

    const element = useMemo(() => getFormElement(property), [getFormElement, property]);

    return {
        element,
    };
}
