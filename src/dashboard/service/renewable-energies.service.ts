import { isAxiosError } from "axios";
import { httpClient } from "../../shared";
import { RenewableEnergyResponse } from "../interfaces/renewable-energy-response.interface";
import { CountryEnergyTotalResponse } from "../interfaces/country-energy-total-response.interface";
import { EnergyBySourceAndCountry } from "../hooks/renewable-energy/useRenewableEnergies";
import {
    BaseRenewableEnergy,
    RenewableEnergyFormInputs,
} from "../interfaces/renewable-energies/renewable-energy.interface";

const URL = "/renewable-energy";

export const findAllRenewableEnergies = async (currentPage: number = 0) => {
    try {
        const { data } = await httpClient<RenewableEnergyResponse>(
            `${URL}?page=${currentPage}`
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

export const findRenewableEnergyById = async (
    idRenewableEnergy: BaseRenewableEnergy["id"]
) => {
    try {
        const { data } = await httpClient.get<BaseRenewableEnergy>(
            `${URL}/${idRenewableEnergy}`
        );
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
};

export const createRenewableEnergy = async (
    newRenewableEnergy: RenewableEnergyFormInputs
) => {
    try {
        const { data } = await httpClient.post(URL, newRenewableEnergy);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
};

interface Options {
    idRenewableEnergy: BaseRenewableEnergy["id"];
    formData: RenewableEnergyFormInputs;
}

export const updateRenewableEnergy= async ({
    idRenewableEnergy,
    formData,
}: Options) => {
    try {
        const { data } = await httpClient.patch(
            `${URL}/${idRenewableEnergy}`,
            formData
        );
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
};

export const deleteRenewableEnergy = async (idEnergyType: BaseRenewableEnergy["id"]) => {
    try {
        const { data } = await httpClient.delete<string>(
            `${URL}/${idEnergyType}`
        );
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
};
