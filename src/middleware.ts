import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ["/public", "/", "/create"],
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
