import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { userService } from "../..";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

export const useUserMutation = (idUser?: number) => {
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();
    const dashboad = "/dashboard/users";
    const queryClient = useQueryClient();

    const createUserMutation = useMutation({
        mutationFn: userService.createUser,
        onError: (error: Error) => {
            MySwal.fire({
                title: "Error",
                text: error.message,
                icon: "error",
                confirmButtonText: "Cerrar",
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
            MySwal.fire({
                title: "¡Éxito!",
                text: "Usuario creado con éxito.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
            }).then(() => {
                navigate(dashboad);
            });
        },
    });

    const updateUserMutation = useMutation({
        mutationFn: userService.updateUser,
        onError: (error: Error) => {
            MySwal.fire({
                title: "Error",
                text: error.message,
                icon: "error",
                confirmButtonText: "Cerrar",
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users", idUser],
            });
            MySwal.fire({
                title: "¡Éxito!",
                text: "Usuario actualizado con éxito.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
            }).then(() => {
                navigate(dashboad);
            });
        },
    });
    const deleteUserMutation = useMutation({
        mutationFn: userService.deleteUser,
        onError: (error: Error) => {
            MySwal.fire({
                title: "Error",
                text: error.message,
                icon: "error",
                confirmButtonText: "Cerrar",
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
            MySwal.fire({
                title: "¡Éxito!",
                text: "Usuario eliminado con éxito.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
            });
        },
    });

    return { deleteUserMutation, createUserMutation, updateUserMutation };
};
