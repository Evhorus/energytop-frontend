import { isAxiosError } from "axios";
import { httpClient } from "../../shared";
import { RenewableEnergyResponse } from "../interfaces/renewable-energy-response.interface";
import { CountriesResponse } from "../interfaces/countries-response.interface";
import { EnergyTypeResponse } from "../interfaces/energy-type-response.interface";
import { CountryEnergyTotalResponse } from "../interfaces/country-energy-total-response.interface";
import { EnergyBySourceAndCountry } from "../hooks/renewable-energy/useRenewableEnergy";

const URL = "/renewable-energy";

export const findAllRenewableEnergy = async (page: number = 0) => {
    try {
        const { data } = await httpClient<RenewableEnergyResponse>(
            `${URL}?page=${page}`
        );
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
};

export const getTotalRenewableEnergyBySourceAndCountry = async ({
    energyTypeName,
    year,
}: EnergyBySourceAndCountry) => {
    try {
        const { data } = await httpClient<CountryEnergyTotalResponse[]>(
            `${URL}/total-production?energyName=${energyTypeName}&year=${year}`
        );
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
};

export const getCountries = async () => {
    try {
        const { data } = await httpClient<CountriesResponse[]>(
            `${URL}/countries`
        );
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
};
export const getEnergyTypes = async () => {
    try {
        const { data } = await httpClient<EnergyTypeResponse[]>(
            `${URL}/energy-types`
        );
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
};
