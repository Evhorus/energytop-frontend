import { isAxiosError } from "axios";
import { httpClient } from "../../shared";
import { UserFormLogin } from "../../shared/interfaces/user.interface";
import { LoginResponse } from "../interface/LoginReponse";

export const loginUser = async (
    userFormLogin: UserFormLogin
): Promise<LoginResponse> => {
    const url = "/login";
    try {
        const { data } = await httpClient.post<LoginResponse>(
            url,
            userFormLogin
        );
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message); // Lanza un error con el mensaje adecuado
        }
        throw new Error("Error en la solicitud de inicio de sesión"); // Lanza un error genérico si no es un error de Axios
    }
};

export const validateTokenJwt = async (token: string) => {
    const url = "/users/validate-token";
    try {
        const { data } = await httpClient.post(url, { token });
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message); // Lanza un error con el mensaje adecuado
        }
        throw new Error("Error en la solicitud de inicio de sesión"); // Lanza un error genérico si no es un error de Axios
    }
};
