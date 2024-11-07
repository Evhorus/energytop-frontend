import { isAxiosError } from "axios";
import { httpClient } from "../../shared";
import {
    BaseUser,
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
    email?: string
    idUser?: UserResponse["id"];
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

export const updateProfile = async ({ email, formData }: Options) => {

    console.log(`${URL}/profile/${email}`, formData)
    try {
        const { data } = await httpClient.patch(`${URL}/profile/${email}`, formData);
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
export const findUserById = async (identifier: UserResponse["id"] | UserResponse["email"]) => {
    try {
        const { data } = await httpClient.get<UserResponse>(`${URL}/${identifier}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
};
export const searchUsers = async (searchTerm: string, searchBy: string) => {
    try {
        const { data } = await httpClient<UserResponse[]>(
            `${URL}/search?searchTerm=${searchTerm}&searchBy=${searchBy}`
        );
        
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
