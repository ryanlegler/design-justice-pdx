import { Properties } from "@/types";
import { CreatePageResponse } from "@notionhq/client/build/src/api-endpoints";

export type FormProps = {
    properties: Properties;
    // createRow?: any;
    // dbId: string;
    // anonymous?: boolean;
    // onCreate?: (response: CreatePageResponse) => void;
    handleCreateRow?: any;
    handleOnComplete?: string;
};

export type PropertyMap = {
    [key: string]: string | boolean;
};
