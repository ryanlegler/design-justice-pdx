import { useCallback, useMemo } from "react";
import { Property, PropertyType, Option } from "@/types";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { Select } from "@/components/select";
import { StyledFormGroup, StyledFormGroupInline, StyledInput } from "@/components/styledComponents";

// import { z } from "zod";
// const UrlSchema = z.string().url();
// export type Url = z.infer<typeof UrlSchema>;

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

            const placeholder = nameSegments
                .find((segment) => segment.startsWith("placeholder"))
                ?.replace("placeholder=", "");
            const type = property.type as PropertyType;
            const options = (property as any)?.[type]?.options as Option[]; // fix any

            return {
                select: () => {
                    return (
                        <StyledFormGroup required={required}>
                            <span>
                                {name} {required ? <span className="text-red-600">*</span> : null}
                            </span>
                            <Select
                                placeholder={placeholder}
                                required={required}
                                options={options}
                                {...register(id, { required })}
                            />
                        </StyledFormGroup>
                    );
                },
                multi_select: () => {
                    return (
                        <StyledFormGroup required={required}>
                            <span>
                                {name} {required ? <span className="text-red-600">*</span> : null}
                            </span>
                            <Select
                                placeholder={placeholder}
                                required={required}
                                options={options}
                                {...register(id)}
                            />
                        </StyledFormGroup>
                    );
                },
                status: () => {
                    return (
                        <StyledFormGroup required={required}>
                            <span>
                                {name} {required ? <span className="text-red-600">*</span> : null}
                            </span>
                            <Select
                                placeholder={placeholder}
                                required={required}
                                options={options}
                                {...register(id)}
                            />
                        </StyledFormGroup>
                    );
                },
                date: () => {
                    return (
                        <StyledFormGroup required={required}>
                            <span>
                                {name} {required ? <span className="text-red-600">*</span> : null}
                            </span>
                            <StyledInput required={required} type="date" {...register(id)} />
                        </StyledFormGroup>
                    );
                },
                url: () => {
                    return (
                        <StyledFormGroup required={required}>
                            <span>
                                {name} {required ? <span className="text-red-600">*</span> : null}
                            </span>
                            <StyledInput
                                placeholder={placeholder}
                                required={required}
                                type="url"
                                {...register(id)}
                            />
                        </StyledFormGroup>
                    );
                },
                created_time: () => {
                    return (
                        <StyledFormGroup required={required}>
                            <span>
                                {name} {required ? <span className="text-red-600">*</span> : null}
                            </span>
                            <StyledInput
                                placeholder={placeholder}
                                required={required}
                                type="date"
                                {...register(id)}
                            />
                        </StyledFormGroup>
                    );
                },
                title: () => {
                    return (
                        <StyledFormGroup required={required}>
                            <span>
                                {name} {required ? <span className="text-red-600">*</span> : null}
                            </span>
                            <StyledInput
                                placeholder={placeholder}
                                required={required}
                                type="text"
                                {...register(id)}
                            />
                        </StyledFormGroup>
                    );
                },
                email: () => {
                    return (
                        <StyledFormGroup required={required}>
                            <span>
                                {name} {required ? <span className="text-red-600">*</span> : null}
                            </span>
                            <StyledInput
                                placeholder={placeholder}
                                required={required}
                                type="email"
                                {...register(id)}
                            />
                        </StyledFormGroup>
                    );
                },
                checkbox: () => {
                    return (
                        // instead of StyledFormGroupInline - use a variant, or className override pattern
                        <StyledFormGroupInline required={required}>
                            <StyledInput
                                placeholder={placeholder}
                                required={required}
                                type="checkbox"
                                {...register(id)}
                            />
                            <span>
                                {name} {required ? <span className="text-red-600">*</span> : null}
                            </span>
                        </StyledFormGroupInline>
                    );
                },
                text: () => {
                    return (
                        <StyledFormGroup required={required}>
                            <span>
                                {name} {required ? <span className="text-red-600">*</span> : null}
                            </span>
                            <StyledInput
                                placeholder={placeholder}
                                required={required}
                                type="text"
                                {...register(id)}
                            />
                        </StyledFormGroup>
                    );
                },
                rich_text: () => {
                    return (
                        <StyledFormGroup required={required}>
                            <span>
                                {name} {required ? <span className="text-red-600">*</span> : null}
                            </span>
                            <StyledInput
                                placeholder={placeholder}
                                required={required}
                                type="text"
                                {...register(id)}
                            />
                        </StyledFormGroup>
                    );
                },
                number: () => {
                    return (
                        <StyledFormGroup required={required}>
                            <span>
                                {name} {required ? <span className="text-red-600">*</span> : null}
                            </span>
                            <StyledInput
                                placeholder={placeholder}
                                required={required}
                                type="number"
                                {...register(id)}
                            />
                        </StyledFormGroup>
                    );
                },
                phone_number: () => {
                    return (
                        <StyledFormGroup required={required}>
                            <span>
                                {name}
                                {required ? <span className="text-red-600">*</span> : null}
                            </span>
                            <StyledInput
                                placeholder={placeholder}
                                title="Telephone number: xxx-xxx-xxxx"
                                required={required}
                                id="phone"
                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
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
