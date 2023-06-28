import type { AllHTMLAttributes } from "react";
export type ButtonProps = AllHTMLAttributes<HTMLElement> & {
    handler?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
