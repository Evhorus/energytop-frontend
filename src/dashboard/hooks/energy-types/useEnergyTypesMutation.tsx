import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BaseEnergyType } from "../../interfaces/energy-types/energy-type.interface";
import { useNavigate } from "react-router-dom";
import { showNotification } from "../../components/Notification";
import { energyTypesService } from "../..";

interface Options {
    idEnergyType?: BaseEnergyType["id"];
    redirect?: string;
}

export const useEnergyTypesMutation = ({ idEnergyType, redirect }: Options) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const createEnergyTypeMutation = useMutation({
        mutationFn: energyTypesService.createEnergyType,
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
                queryKey: ["energyTypes"],
            });
            showNotification({
                title: "¡Éxito!",
                text: "Tipo de energía creado con éxito.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
                onClose: () => {
                    navigate(redirect!);
                },
            });
        },
    });

    const updateEnergyTypeMutation = useMutation({
        mutationFn: energyTypesService.updateEnergyType,
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
                queryKey: ["energyTypes"],
            });
            queryClient.invalidateQueries({
                queryKey: ["energyType", idEnergyType],
            });
            showNotification({
                title: "¡Éxito!",
                text: "Tipo de energía actualizado con éxito.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
                onClose: () => {
                    navigate(redirect!);
                },
            });
        },
    });

    const deleteEnergyTypeMutation = useMutation({
        mutationFn: energyTypesService.deleteEnergyType,
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
                queryKey: ["energyTypes"],
            });
            queryClient.invalidateQueries({
                queryKey: ["searchEnergyTypes"],
            });
            showNotification({
                title: "¡Éxito!",
                text: "Tipo de energía eliminado con éxito.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
            });
        },
    });

    return {
        createEnergyTypeMutation,
        updateEnergyTypeMutation,
        deleteEnergyTypeMutation,
    };
};
