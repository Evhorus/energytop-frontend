import { useQuery } from "@tanstack/react-query";
import { renewableEnergyService } from "../..";
interface Options {
    currentPage?: number;
    listEnergies?: boolean;
    energyBySourceAndCountry?: EnergyBySourceAndCountry;
}
export interface EnergyBySourceAndCountry {
    energyTypeName: string;
    year: number;
}

export const useRenewableEnergy = ({
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
            renewableEnergyService.findAllRenewableEnergy(currentPage),
        enabled: !!listEnergies,
        retry: 1,
        refetchOnWindowFocus: false,
    });

    const countries = useQuery({
        queryKey: ["countries"],
        queryFn: () => renewableEnergyService.getCountries(),
        retry: 1,
        refetchOnWindowFocus: false,
    });

    const energyTypes = useQuery({
        queryKey: ["energyTypes"],
        queryFn: () => renewableEnergyService.getEnergyTypes(),
        retry: 1,
        refetchOnWindowFocus: false,
    });

    return { renewableEnergies, countries, energyTypes, totalRenewableEnergy };
};
