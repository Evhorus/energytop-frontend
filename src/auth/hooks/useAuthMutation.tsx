import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authService } from "../";
import { useAppStore } from "../../shared/store/useAppStore";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

export const useAuthMutation = () => {
    const MySwal = withReactContent(Swal);
    const setTokenAuth = useAppStore((state) => state.setTokenAuth);
    const logout = useAppStore((state) => state.logout);
    const setClaims = useAppStore((state) => state.setClaims);
    const navigate = useNavigate();
    const dashboard = "/users"; // Corrige el typo 'dasboard' a 'dashboard'

    const loginUserMutation = useMutation({
        mutationFn: authService.loginUser,
        onError: (error: Error) => {
            MySwal.fire({
                title: "Error de inicio de sesión",
                text: error.message || "Ha ocurrido un error inesperado.",
                icon: "error",
                confirmButtonText: "Cerrar",
            });
        },
        onSuccess: (data) => {
            const token = data.token;
            const claimsRaw = JSON.parse(atob(token.split(".")[1]));
            if (claimsRaw) {
                setTokenAuth(token);
                setClaims(claimsRaw);
                MySwal.fire({
                    title: "¡Éxito!",
                    text: "Has iniciado sesión correctamente.",
                    icon: "success",
                    confirmButtonText: "Continuar",
                }).then(() => {
                    navigate(dashboard);
                });
            }
        },
    });

    const validateTokenJwtMutation = useMutation({
        mutationFn: authService.validateTokenJwt,
        onError: () => {
            logout();
        },
        onSuccess: () => {},
    });

    return { loginUserMutation, validateTokenJwtMutation };
};
