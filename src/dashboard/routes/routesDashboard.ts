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
const MyAccountPage = lazy(() =>
    import("../pages/user/MyAccountPage").then((module) => ({
        default: module.MyAccountPage,
    }))
);
const RenewableEnergiesListPage = lazy(() =>
    import("../pages/renewable-energies/RenewableEnergiesListPage").then((module) => ({
        default: module.RenewableEnergiesListPage,
    }))
);
const AdvancedEnergySearchPage = lazy(() =>
    import("../pages/renewable-energies/AdvancedEnergySearchPage").then((module) => ({
        default: module.AdvancedEnergySearchPage,
    }))
);
export const routesDashboard = [
    {
        title: "Dashboard",
        to: "/dashboard/home",
        component: DasboardPage,
    },
    {
        title: "Users",
        to: "/dashboard/users",
        component: ListUsersPage,
    },
    
    {
        title: "Create User",
        to: "/dashboard/users/create-user",
        component: NewUserPage,
    },
    {
        title: "Update User",
        to: "/dashboard/users/update-user/:id",
        component: UpdateUserPage,
    },
    {
        title: "Update User",
        to: "/dashboard/my-account",
        component: MyAccountPage,
    },
    {
        title: "Renewable Energies",
        to: "/dashboard/renewable-energies",
        component: RenewableEnergiesListPage,
    },
    {
        title: "AdvancedEnergySearch ",
        to: "/dashboard/renewable-energies/advanced-energy-search",
        component: AdvancedEnergySearchPage,
    },
];
