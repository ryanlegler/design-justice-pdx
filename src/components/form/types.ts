import { Properties } from "@/types";

export type FormProps = {
    properties: Properties;
    redirectPath?: string;
    handleCreateRow?: (data: PropertyMap) => Promise<void>;
    handleOnComplete?: string;
};

export type PropertyMap = {
    [key: string]: string | boolean;
};
