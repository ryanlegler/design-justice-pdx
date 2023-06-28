import tw from "tailwind-styled-components";

const required = (props: { required?: boolean }) => (props.required ? "bg-magenta-600" : "");

export const StyledFormGroup = tw.label<{ required?: boolean }>`
    ${required}
    flex
    flex-col
    gap-1
`;

export const StyledInput = tw.input`
    px-3
    py-3
    rounded-md
`;
