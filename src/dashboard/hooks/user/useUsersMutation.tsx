import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../..";
import { showNotification } from "../../components/Notification";
import { useNavigate } from "react-router-dom";
import { UserResponse } from "../../../shared/interfaces/user.interface";

interface Options {
    redirect?: string;
    identifier?: UserResponse["id"] | UserResponse["email"];
}

export const useUserMutation = ({ redirect, identifier }: Options) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const createUserMutation = useMutation({
        mutationFn: userService.createUser,
        onError: (error: Error) => {
            showNotification({
                title: "Error",
                text: error.message,
                icon: "error",
                showConfirmButton: false,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
            showNotification({
                title: "¡Éxito!",
                text: "Usuario creado con éxito.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
                onClose: () => {
                    navigate(redirect!);
                },
            });
        },
    });

    const updateUserMutation = useMutation({
        mutationFn: userService.updateUser,
        onError: (error: Error) => {
            showNotification({
                title: "Error",
                text: error.message,
                icon: "error",
                showConfirmButton: false,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
            queryClient.invalidateQueries({
                queryKey: ["user", identifier],
            });
            showNotification({
                title: "¡Éxito!",
                text: "Usuario actualizado con éxito.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
                onClose: () => {
                    navigate(redirect!);
                },
            });
        },
    });

    const deleteUserMutation = useMutation({
        mutationFn: userService.deleteUser,
        onError: (error: Error) => {
            showNotification({
                title: "Error",
                text: error.message,
                icon: "error",
                showConfirmButton: false,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
            showNotification({
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
