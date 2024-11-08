import { useQuery } from "@tanstack/react-query";
import { renewableEnergyService } from "../..";
import { BaseRenewableEnergy } from "../../interfaces/renewable-energies/renewable-energy.interface";
interface Options {
    idRenewableEnergy?: BaseRenewableEnergy["id"];
    currentPage?: number;
    listEnergies?: boolean;
    energyBySourceAndCountry?: EnergyBySourceAndCountry;
    pageSize?: number;
    searchTerm?: string;
    searchBy?: string;
}
export interface EnergyBySourceAndCountry {
    energyTypeName: string;
    year: number;
}

export const useRenewableEnergies = ({
    idRenewableEnergy,
    listEnergies,
    currentPage,
    energyBySourceAndCountry,
    pageSize,
    searchBy,
    searchTerm,
}: Options) => {
    const totalRenewableEnergy = useQuery({
        queryKey: [
            "renewableEnergies",
            energyBySourceAndCountry?.energyTypeName,
            energyBySourceAndCountry?.year,
        ],
        queryFn: () =>
            renewableEnergyService.getTotalRenewableEnergyBySourceAndCountry(
                energyBySourceAndCountry!
            ),
        enabled:
            !!energyBySourceAndCountry?.energyTypeName &&
            !!energyBySourceAndCountry?.year,
        retry: 1,
        refetchOnWindowFocus: false,
    });

    const renewableEnergies = useQuery({
        queryKey: ["renewableEnergies", currentPage],
        queryFn: () =>
            renewableEnergyService.findAllRenewableEnergies(
                currentPage,
                pageSize
            ),
        enabled: !!listEnergies,
        retry: 1,
        refetchOnWindowFocus: false,
    });

    const renewableEnergy = useQuery({
        queryKey: ["renewableEnergy", idRenewableEnergy],
        queryFn: () =>
            renewableEnergyService.findRenewableEnergyById(idRenewableEnergy!),
        retry: 1,
        enabled: !!idRenewableEnergy,
        refetchOnWindowFocus: false,
    });

    const searchRenewableEnergies = useQuery({
        queryKey: ["searchRenewableEnergies"],
        queryFn: () =>
            renewableEnergyService.searchRenewableEnergies(
                searchTerm!,
                searchBy!
            ),
        retry: 1,
        enabled: !!searchTerm, // Solo activa esta consulta si hay un término de búsqueda
        refetchOnWindowFocus: false,
    });

    return {
        totalRenewableEnergy,
        renewableEnergies,
        renewableEnergy,
        searchRenewableEnergies,
    };
};
