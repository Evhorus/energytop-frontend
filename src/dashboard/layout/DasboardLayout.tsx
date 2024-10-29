import { Navigate, Outlet } from "react-router-dom";
import { useAppStore } from "../../shared/store/useAppStore";
import { Header } from "../components/Header";
import { useAuthMutation } from "../../auth";
import { useEffect } from "react";
export default function DasboardLayout() {
    const isAuth = useAppStore((state) => state.isAuth);
    const { validateTokenJwtMutation } = useAuthMutation();
    useEffect(() => {
        if (sessionStorage.getItem("AUTH_TOKEN")) {
            const token = sessionStorage.getItem("AUTH_TOKEN")!;
            validateTokenJwtMutation.mutate(token);
        }
    }, []);

    if (!isAuth) return <Navigate to="/auth/login" />;
    // if(user.error)
    return (
        <div>
            <Header />
            <main>
                <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
