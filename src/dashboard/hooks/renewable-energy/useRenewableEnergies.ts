import { useQuery } from "@tanstack/react-query";
import { renewableEnergyService } from "../..";
import { BaseRenewableEnergy } from "../../interfaces/renewable-energies/renewable-energy.interface";
interface Options {
    idRenewableEnergy?: BaseRenewableEnergy["id"];
    currentPage?: number;
    listEnergies?: boolean;
    energyBySourceAndCountry?: EnergyBySourceAndCountry;
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
            renewableEnergyService.findAllRenewableEnergies(currentPage),
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

    return { totalRenewableEnergy, renewableEnergies, renewableEnergy };
};
