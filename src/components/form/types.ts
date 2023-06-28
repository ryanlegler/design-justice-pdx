import { Properties } from "@/types";

export type FormProps = {
    properties: Properties;
    createRow?: any;
    dbId: string;
};

export type PropertyMap = {
    [key: string]: string | boolean;
};
