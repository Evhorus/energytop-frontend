import { Navigate } from "react-router-dom";
import { useAppStore } from "../../shared/store/useAppStore";
import { useQueryClient } from "@tanstack/react-query";

export const Header = () => {
    const queryClient = useQueryClient();
    const logout = useAppStore((state) => state.logout);

    const handleLogout = (): void => {
        logout();
        queryClient.clear();
        <Navigate to="/auth/login" />;
    };
    return (
        <div className="flex justify-around bg-green-500">
            <div className=" p-5">Aqui va el diseño del header</div>;
            <div>
                <button className="p-2 bg-slate-200 " onClick={handleLogout}>
                    Cerra Sesion
                </button>
            </div>
        </div>
    );
};
