import { isAxiosError } from "axios";
import { httpClient } from "../../shared";
import { RenewableEnergyResponse } from "../interfaces/renewable-energy-response.interface";
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
