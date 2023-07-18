import { Properties, Property } from "@/types";

export function usePropertyCollection(properties: Properties): Property[] {
    return Object.keys(properties)
        .map((key) => ({
            ...properties[key],
        }))
        .filter((property) => {
            return !property.name.includes("*admin");
        })
        .sort((a: Property, b: Property) => {
            const aNameSegments = a.name.split("*");
            const aOrder = aNameSegments
                .find((segment) => segment.includes("order="))
                ?.replace("order=", "");

            const bNameSegments = b.name.split("*");
            const bOrder = bNameSegments
                .find((segment) => segment.includes("order="))
                ?.replace("order=", "");

            if (aOrder && bOrder) {
                return parseInt(aOrder) - parseInt(bOrder);
            } else {
                return 0;
            }
        });
}
