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

const AdvancedEnergySearchPage = lazy(() =>
    import("../pages/energy-data/AdvancedEnergySearchPage").then((module) => ({
        default: module.AdvancedEnergySearchPage,
    }))
);

const RenewableEnergiesListPage = lazy(() =>
    import(
        "../pages/energy-management/renewable-energies/RenewableEnergiesListPage"
    ).then((module) => ({
        default: module.RenewableEnergiesListPage,
    }))
);
const CreateRenewableEnergyPage = lazy(() =>
    import(
        "../pages/energy-management/renewable-energies/CreateRenewableEnergyPage"
    ).then((module) => ({
        default: module.CreateRenewableEnergyPage,
    }))
);
const UpdateRenewableEnergyPage = lazy(() =>
    import(
        "../pages/energy-management/renewable-energies/UpdateRenewableEnergyPage"
    ).then((module) => ({
        default: module.UpdateRenewableEnergyPage,
    }))
);


const EnergyTypesListPage = lazy(() =>
    import("../pages/energy-management/energy-types/EnergyTypesListPage").then(
        (module) => ({
            default: module.EnergyTypesListPage,
        })
    )
);
const CreateEnergyTypePage = lazy(() =>
    import("../pages/energy-management/energy-types/CreateEnergyTypePage").then(
        (module) => ({
            default: module.CreateEnergyTypePage,
        })
    )
);
const UpdateEnergyTypePage = lazy(() =>
    import("../pages/energy-management/energy-types/UpdateEnergyTypePage").then(
        (module) => ({
            default: module.UpdateEnergyTypePage,
        })
    )
);
const CountriesListPage = lazy(() =>
    import("../pages/energy-management/countries/CountriesListPage").then(
        (module) => ({
            default: module.CountriesListPage,
        })
    )
);
const CreateCountryPage = lazy(() =>
    import("../pages/energy-management/countries/CreateCountryPage").then(
        (module) => ({
            default: module.CreateCountryPage,
        })
    )
);
const UpdateCountryPage = lazy(() =>
    import("../pages/energy-management/countries/UpdateCountryPage").then(
        (module) => ({
            default: module.UpdateCountryPage,
        })
    )
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
        title: "Advanced EnergySearch",
        to: "/dashboard/energy-data/advanced-energy-search",
        component: AdvancedEnergySearchPage,
    },
    {
        title: "Renewable Energies",
        to: "/dashboard/energy-management/renewable-energies",
        component: RenewableEnergiesListPage,
    },
    {
        title: "Renewable Energies",
        to: "/dashboard/energy-management/renewable-energies/create-renewable-energy",
        component: CreateRenewableEnergyPage,
    },
    {
        title: "Renewable Energies",
        to: "/dashboard/energy-management/renewable-energies/update-renewable-energy/:id",
        component: UpdateRenewableEnergyPage,
    },
    {
        title: "Energy Types List",
        to: "/dashboard/energy-management/energy-types",
        component: EnergyTypesListPage,
    },
    {
        title: "Create Energy Type",
        to: "/dashboard/energy-management/energy-types/create-energy-type",
        component: CreateEnergyTypePage,
    },
    {
        title: "Update Energy Type",
        to: "/dashboard/energy-management/energy-types/update-energy-type/:id",
        component: UpdateEnergyTypePage,
    },
    {
        title: "Countries List",
        to: "/dashboard/energy-management/countries",
        component: CountriesListPage,
    },
    {
        title: "Create Country",
        to: "/dashboard/energy-management/countries/create-country",
        component: CreateCountryPage,
    },
    {
        title: "Update Country",
        to: "/dashboard/energy-management/countries/update-country/:id",
        component: UpdateCountryPage,
    },
];
