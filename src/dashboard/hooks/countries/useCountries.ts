import { useQuery } from "@tanstack/react-query";
import { countriesService } from "../..";
import { BaseCountry } from "../../interfaces/countries/countries.interface";

interface Options {
    idCountry?: BaseCountry["id"];
    currentPage?: number;
    pageSize?: number;
    searchTerm?: string;
    searchBy?: string; 
}
export const useCountries = ({
    idCountry,
    currentPage,
    pageSize,
    searchBy,
    searchTerm,
}: Options) => {
    const countries = useQuery({
        queryKey: ["countries", currentPage],
        queryFn: () => countriesService.getCountries(currentPage, pageSize),
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

    // Consulta para buscar países usando un término de búsqueda y un filtro
    const searchCountries = useQuery({
        queryKey: ["searchCountries"],
        queryFn: () => countriesService.searchCountries(searchTerm!, searchBy!),
        retry: 1,
        enabled: !!searchTerm, // Solo activa esta consulta si hay un término de búsqueda
        refetchOnWindowFocus: false,
    });
    return { countries, country, searchCountries };
};
