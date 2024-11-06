import { useNavigate } from "react-router-dom";
import { BaseCountry } from "../../interfaces/countries/countries.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { countriesService } from "../..";
import { showNotification } from "../../components/Notification";

interface Options {
    idCountry?: BaseCountry["id"];
    redirect?: string;
}

export const useCountriesMutation = ({ idCountry, redirect }: Options) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const createCountryMutation = useMutation({
        mutationFn: countriesService.createCountry,
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
                queryKey: ["countries"],
            });
            showNotification({
                title: "¡Éxito!",
                text: "País creado con éxito.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
                onClose: () => {
                    navigate(redirect!);
                },
            });
        },
    });

    const updateCountryMutation = useMutation({
        mutationFn: countriesService.updateCountry,
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
                queryKey: ["countries"],
            });
            queryClient.invalidateQueries({
                queryKey: ["country", idCountry],
            });
            showNotification({
                title: "¡Éxito!",
                text: "País actualizado con éxito.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
                onClose: () => {
                    navigate(redirect!);
                },
            });
        },
    });

    const deleteCountryMutation = useMutation({
        mutationFn: countriesService.deleteCountry,
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
                queryKey: ["countries"],
            });
            showNotification({
                title: "¡Éxito!",
                text: "País eliminado con éxito.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
            });
        },
    });

    return {
        createCountryMutation,
        updateCountryMutation,
        deleteCountryMutation,
    };
};
