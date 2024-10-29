import { lazy } from "react";

const DasboardPage = lazy(() =>
    import("../pages/DashboardPage").then((module) => ({
        default: module.DashboardPage,
    }))
);
const ListUsersPage = lazy(() =>
    import("../pages/user/ListUsersPage").then((module) => ({
        default: module.ListUsersPage,
    }))
);
const NewUserPage = lazy(() =>
    import("../pages/user/CreateUserPage").then((module) => ({
        default: module.CreateUserPage,
    }))
);
const UpdateUserPage = lazy(() =>
    import("../pages/user/UpdateUserPage").then((module) => ({
        default: module.UpdateUserPage,
    }))
);

export const routesDashboard = [
    {
        title: "dashboard",
        to: "/dashboard",
        component: DasboardPage,
    },
    {
        title: "users",
        to: "/dashboard/users",
        component: ListUsersPage,
    },
    
    {
        title: "create-user",
        to: "/dashboard/create-user",
        component: NewUserPage,
    },
    {
        title: "update-user",
        to: "/dashboard/update-user/:id",
        component: UpdateUserPage,
    },
];
