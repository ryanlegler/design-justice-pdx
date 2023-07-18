import { forwardRef } from "react";
import { Option } from "@/types";

import { SelectProps } from "./types";
import { StyledSelect } from "./styledComponents";

// eslint-disable-next-line react/display-name
export const Select = forwardRef(
    ({ onChange, onBlur, name, options, placeholder }: SelectProps, ref: any) => {
        return (
            <StyledSelect
                name={name}
                ref={ref}
                onChange={onChange}
                onBlur={onBlur}
                defaultValue={"none"}
            >
                <option value="none" disabled hidden>
                    {placeholder ? placeholder : "Select an Option"}
                </option>
                {options?.map((option: Option) => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </StyledSelect>
        );
    }
);
