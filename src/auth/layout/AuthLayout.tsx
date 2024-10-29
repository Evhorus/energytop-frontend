import { Navigate, Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { useAppStore } from "../../shared/store/useAppStore";

export const AuthLayout = () => {
    const isAuth = useAppStore((state) => state.isAuth);
    if (isAuth) return <Navigate to="/dashboard" />;
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-200 flex flex-col">
            <Header />
            <div className="flex-1 flex items-center justify-center mt-10">
                <Outlet />
            </div>
        </div>
    );
};
