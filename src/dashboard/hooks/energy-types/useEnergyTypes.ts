import { useQuery } from "@tanstack/react-query";
import { energyTypesService } from "../..";
import { BaseEnergyType } from "../../interfaces/energy-types/energy-type.interface";

interface Options {
    idEnergyType?: BaseEnergyType["id"];
    currentPage?: number;
    pageSize?: number;
}

export const useEnergyTypes = ({ currentPage, idEnergyType,pageSize }: Options) => {
    const energyTypes = useQuery({
        queryKey: ["energyTypes", currentPage],
        queryFn: () => energyTypesService.getEnergyTypes(currentPage, pageSize),
        retry: 1,
        refetchOnWindowFocus: false,
    });

    const energyType = useQuery({
        queryKey: ["energyType", idEnergyType],
        queryFn: () => energyTypesService.findEnergyTypeById(idEnergyType!),
        retry: 1,
        enabled: !!idEnergyType,
        refetchOnWindowFocus: false,
    });

    return { energyTypes, energyType };
};
