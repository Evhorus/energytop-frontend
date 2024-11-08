import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { showNotification } from "../../components/Notification";
import { renewableEnergyService } from "../..";
import { BaseRenewableEnergy } from "../../interfaces/renewable-energies/renewable-energy.interface";

interface Options {
    idRenewableEnergy?: BaseRenewableEnergy["id"];
    redirect?: string;
    searchBy?: string;
    searchTerm?: string;
}

export const useRenewableEnergyMutation = ({
    idRenewableEnergy,
    redirect,
    searchBy,
    searchTerm,
}: Options) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const createRenewableEnergyMutation = useMutation({
        mutationFn: renewableEnergyService.createRenewableEnergy,
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
                queryKey: ["renewableEnergies"],
            });
            showNotification({
                title: "¡Éxito!",
                text: "Energia revobale creada con éxito.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
                onClose: () => {
                    navigate(redirect!);
                },
            });
        },
    });

    const updateRenewableEnergyMutation = useMutation({
        mutationFn: renewableEnergyService.updateRenewableEnergy,
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
                queryKey: ["renewableEnergies"],
            });
            queryClient.invalidateQueries({
                queryKey: ["renewableEnergy", idRenewableEnergy],
            });
            showNotification({
                title: "¡Éxito!",
                text: "Energia renovable actualizada con éxito.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
                onClose: () => {
                    navigate(redirect!);
                },
            });
        },
    });

    const deleteRenewableEnergyMutation = useMutation({
        mutationFn: renewableEnergyService.deleteRenewableEnergy,
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
                queryKey: ["renewableEnergies"]
            });
            queryClient.invalidateQueries({
                queryKey: ["searchRenewableEnergies"],
            });
            showNotification({
                title: "¡Éxito!",
                text: "Energia renovable eliminada con éxito.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
            });
        },
    });

    return {
        createRenewableEnergyMutation,
        updateRenewableEnergyMutation,
        deleteRenewableEnergyMutation,
    };
};
