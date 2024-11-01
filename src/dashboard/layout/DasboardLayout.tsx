import { Navigate, Outlet } from "react-router-dom";
import { useAppStore } from "../../shared/store/useAppStore";
import Header from "../components/Header";
import { useAuthMutation } from "../../auth";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/index";
export default function DasboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const isAuth = useAppStore((state) => state.isAuth);
    const { validateTokenJwtMutation } = useAuthMutation();
    useEffect(() => {
        if (sessionStorage.getItem("AUTH_TOKEN")) {
            const token = sessionStorage.getItem("AUTH_TOKEN")!;
            validateTokenJwtMutation.mutate(token);
        }
    }, []);

    if (!isAuth) return <Navigate to="/auth/login" />;
    return (
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
            <div className="flex h-screen overflow-hidden">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    <Header
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />
                    <main>
                        <div className="mx-auto max-w-screen-3xl p-4 md:p-6 2xl:p-6">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
