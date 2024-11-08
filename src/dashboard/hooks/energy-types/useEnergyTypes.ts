import { useQuery } from "@tanstack/react-query";
import { energyTypesService } from "../..";
import { BaseEnergyType } from "../../interfaces/energy-types/energy-type.interface";

interface Options {
    idEnergyType?: BaseEnergyType["id"];
    currentPage?: number;
    pageSize?: number;
    searchTerm?: string;
    searchBy?: string;
}

export const useEnergyTypes = ({
    currentPage,
    idEnergyType,
    pageSize,
    searchBy,
    searchTerm,
}: Options) => {
    const energyTypes = useQuery({
        queryKey: ["energyTypes", currentPage],
        queryFn: () => energyTypesService.getEnergyTypes(currentPage, pageSize),
        retry: 1,
        refetchOnWindowFocus: false,
    });

    const energyType = useQuery({
        queryKey: ["energyTypes", idEnergyType],
        queryFn: () => energyTypesService.findEnergyTypeById(idEnergyType!),
        retry: 1,
        enabled: !!idEnergyType,
        refetchOnWindowFocus: false,
    });

    const searchEnergyTypes = useQuery({
        queryKey: ["searchEnergyTypes"],
        queryFn: () =>
            energyTypesService.searchEnergyTypes(searchTerm!, searchBy!),
        retry: 1,
        enabled: !!searchTerm, // Solo activa esta consulta si hay un término de búsqueda
        refetchOnWindowFocus: false,
    });

    return { energyTypes, energyType, searchEnergyTypes };
};
