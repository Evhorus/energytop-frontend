import { useQuery } from "@tanstack/react-query";
import { countriesService } from "../..";
import { BaseCountry } from "../../interfaces/countries/countries.interface";

interface Options {
    idCountry?: BaseCountry["id"];
    currentPage?: number;
}

export const useCountries = ({ idCountry, currentPage }: Options) => {
    const countries = useQuery({
        queryKey: ["countries", currentPage],
        queryFn: () => countriesService.getCountries(currentPage),
        retry: 1,
        refetchOnWindowFocus: false,
    });

    const country = useQuery({
        queryKey: ["country", idCountry],
        queryFn: () => countriesService.findCountryById(idCountry!),
        retry: 1,
        enabled: !!idCountry,
        refetchOnWindowFocus: false,
    });

    return { countries, country };
};
