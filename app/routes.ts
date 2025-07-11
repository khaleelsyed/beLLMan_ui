import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/chat/:chatID", "routes/chat.tsx"),
] satisfies RouteConfig;
