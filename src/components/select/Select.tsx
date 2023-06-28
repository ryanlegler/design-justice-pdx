import { forwardRef } from "react";
import { Option } from "@/types";

import { SelectProps } from "./types";
import { StyledSelect } from "./styledComponents";
import { StyledFormGroup } from "../styledComponents";

// eslint-disable-next-line react/display-name
export const Select = forwardRef(
    ({ onChange, onBlur, name, label, options }: SelectProps, ref: any) => {
        return (
            <StyledFormGroup>
                {label}
                <StyledSelect name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
                    {options?.map((option: Option) => (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </StyledSelect>
            </StyledFormGroup>
        );
    }
);
