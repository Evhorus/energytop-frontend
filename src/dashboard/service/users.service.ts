import { isAxiosError } from "axios";
import { httpClient } from "../../shared";
import {
    UserFormInputs,
    UserResponse,
} from "../../shared/interfaces/user.interface";

const URL = "/users";

export const createUser = async (newUser: UserFormInputs) => {
    try {
        const { data } = await httpClient.post(URL, newUser);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
};

interface Options {
    idUser: UserResponse["id"];
    formData: UserFormInputs;
}

export const updateUser = async ({ idUser, formData }: Options) => {
    try {
        const { data } = await httpClient.patch(`${URL}/${idUser}`, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
};

export const findAllUsers = async () => {
    try {
        const { data } = await httpClient.get<UserResponse[]>(URL);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
};
export const findUserById = async (id: UserResponse["id"]) => {
    try {
        const { data } = await httpClient.get<UserResponse>(`${URL}/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
};

export const deleteUser = async (id: number) => {
    try {
        const { data } = await httpClient.delete<string>(`${URL}/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
};
