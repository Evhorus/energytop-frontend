import { isAxiosError } from "axios";
import { httpClient } from "../../shared";
import { EnergyTypeResponse } from "../interfaces/energy-types/energy-type.interface";
import {
    BaseEnergyType,
    EnergyTypeFormInputs,
} from "../interfaces/energy-types/energy-type.interface";

const URL = "/energy-types";
export const getEnergyTypes = async (
    currentPage: number = 10,
    pageSize: number = 10
) => {
    try {
        const { data } = await httpClient<EnergyTypeResponse>(
            `${URL}?page=${currentPage}&size=${pageSize}&sort=energyName,asc`
        );
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
};

export const findEnergyTypeById = async (
    idEnergyType: BaseEnergyType["id"]
) => {
    try {
        const { data } = await httpClient.get<BaseEnergyType>(
            `${URL}/${idEnergyType}`
        );
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
};
export const searchEnergyTypes = async (searchTerm: string, searchBy: string) => {
    try {
        const { data } = await httpClient<BaseEnergyType[]>(
            `${URL}/search?searchTerm=${searchTerm}&searchBy=${searchBy}`
        );
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
};
export const createEnergyType = async (newEnergyType: EnergyTypeFormInputs) => {
    try {
        const { data } = await httpClient.post(URL, newEnergyType);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
};

interface Options {
    idEnergyType: BaseEnergyType["id"];
    formData: EnergyTypeFormInputs;
}

export const updateEnergyType = async ({ idEnergyType, formData }: Options) => {
    try {
        const { data } = await httpClient.patch(
            `${URL}/${idEnergyType}`,
            formData
        );
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
};

export const deleteEnergyType = async (idEnergyType: BaseEnergyType["id"]) => {
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
