import { lazy } from "react";

const DasboardPage = lazy(() =>
    import("../../dashboard/pages/DashboardPage").then((module) => ({
        default: module.DashboardPage,
    }))
);
const RegisterPage = lazy(() =>
    import("../pages/RegisterPage").then((module) => ({
        default: module.RegisterPage,
    }))
);

const LoginPage = lazy(() =>
    import("../pages/LoginPage").then((module) => ({
        default: module.LoginPage,
    }))
);

export const routesAuth = [
    {
        title: "login",
        to: "/auth/login",
        component: LoginPage,
    },
    // {
    //     title: "register",
    //     to: "/auth/register",
    //     component: RegisterPage,
    // },
];
