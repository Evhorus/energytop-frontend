import { isAxiosError } from "axios";
import { httpClient } from "../../shared";
import {
    BaseCountry,
    CountryFormInputs,
    CountryResponse,
} from "../interfaces/countries/countries.interface";

const URL = "/countries";

export const getCountries = async (currentPage: number = 10) => {
    try {
        const { data } = await httpClient<CountryResponse>(
            `${URL}?page=${currentPage}`
        );
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
};

export const findCountryById = async (idCountry: BaseCountry["id"]) => {
    try {
        const { data } = await httpClient.get<BaseCountry>(
            `${URL}/${idCountry}`
        );
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
};

export const createCountry = async (newCountry: CountryFormInputs) => {
    try {
        const { data } = await httpClient.post(URL, newCountry);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
};

interface Options {
    idCountry: BaseCountry["id"];
    formData: CountryFormInputs;
}

export const updateCountry = async ({ idCountry, formData }: Options) => {
    try {
        const { data } = await httpClient.patch(
            `${URL}/${idCountry}`,
            formData
        );
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
};

export const deleteCountry = async (idEnergyType: BaseCountry["id"]) => {
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
