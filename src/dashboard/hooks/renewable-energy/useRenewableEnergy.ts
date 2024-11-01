import { useQuery } from "@tanstack/react-query";
import { renewableEnergyService } from "../..";

export const useRenewableEnergy = (currentPage: number) => {
    const renewableEnergies = useQuery({
        queryKey: ["renewableEnergies", currentPage],
        queryFn: () =>
            renewableEnergyService.findAllRenewableEnergy(currentPage),
        retry: 1,
        refetchOnWindowFocus: false,
    });

    return { renewableEnergies };
};
