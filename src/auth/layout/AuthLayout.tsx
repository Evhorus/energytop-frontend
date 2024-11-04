import { Navigate, Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { useAppStore } from "../../shared/store/useAppStore";
import BgImage from "../../assets/bg.jpg";

export const AuthLayout = () => {
    const isAuth = useAppStore((state) => state.isAuth);
    if (isAuth) return <Navigate to="/dashboard/home" />;
    return (
        <div className="min-h-screen flex flex-col ">
            <Header />
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${BgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    zIndex: -1, // Asegúrate de que quede detrás
                }}
            />
            <div className="flex-1 flex items-center justify-center mt-10">
                <Outlet />
            </div>
        </div>
    );
};
