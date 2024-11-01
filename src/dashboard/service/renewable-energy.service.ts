import { isAxiosError } from "axios";
import { httpClient } from "../../shared";
import { RenewableEnergyResponse } from "../interfaces/renewable-energy-response.interface";

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
