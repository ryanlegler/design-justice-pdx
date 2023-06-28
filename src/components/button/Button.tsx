import React from "react";

// styled-components
import { StyledButton } from "./styledComponents";

// types
import { ButtonProps } from "./types";

function Button({ children, ...rest }: ButtonProps) {
    return <StyledButton {...(rest as any)}>{children}</StyledButton>;
}

export { Button };
