import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    // route("some/path", "./some/file.tsx"),
] satisfies RouteConfig;
