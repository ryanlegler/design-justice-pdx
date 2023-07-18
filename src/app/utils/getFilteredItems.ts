import { getFilteredAsks } from "./getFilteredAsks";
import { getFilteredOffers } from "./getFilteredOffers";

export async function getFilteredItems(userId: string) {
    const asks = (await getFilteredAsks(userId))?.results || [];
    const offers = (await getFilteredOffers(userId))?.results || [];
    return [...asks, ...offers];
}

// const filterResultsByUserId = (results: Item[], userId: string) => {
//     return results.filter((item) => {
//         const userIdProperty = item.properties.find((property) => property.id === "title");
//         const matches = (userIdProperty as any)?.title?.[0]?.text?.content === userId;
//         return matches;
//     });
// };
