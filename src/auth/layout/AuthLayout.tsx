import { Navigate, Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { useAppStore } from "../../shared/store/useAppStore";

export const AuthLayout = () => {
    const isAuth = useAppStore((state) => state.isAuth);
    if (isAuth) return <Navigate to="/dashboard/home" />;
    return (
        <div className="min-h-screen flex flex-col ">
            <Header />
            <div className="bg-img-login" />
            <div className="flex-1 flex items-center justify-center mt-10">
                <Outlet />
            </div>
        </div>
    );
};
