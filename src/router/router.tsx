import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthLayout } from "../auth/layout/AuthLayout";
import { Suspense } from "react";
import DasboardLayout from "../dashboard/layout/DasboardLayout";
import { routesDashboard } from "../dashboard/routes/routesDashboard";
import { routesAuth } from "../auth/routes/routesAuth";

export const router = createBrowserRouter([
    {
        element: <AuthLayout />,
        children: [
            ...routesAuth.map((route) => ({
                path: route.to,
                element: (
                    <Suspense fallback="cargando">
                        <route.component />
                    </Suspense>
                ),
            })),
            { path: "*", element: <Navigate to="/auth/login" replace /> },
        ],
    },
    {
        path: "/",
        element: <DasboardLayout />,
        children: [
            ...routesDashboard.map((route) => ({
                path: route.to,
                element: (
                    <Suspense fallback="cargando">
                        <route.component />
                    </Suspense>
                ),
            })),
            {path: "*", element: <Navigate to="/dashboard/home" replace />}
        ],
    },
]);
