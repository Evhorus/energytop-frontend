export interface BaseUser {
    id: number;
    firstName: string;
    username: string;
    lastName: string;
    email: string;
    password?: string | null;
}

export interface UserResponse
    extends Required<
        Pick<BaseUser, "id" | "firstName" | "lastName" | "email" | "password">
    > {}

export interface UserFormInputs
    extends Required<Pick<BaseUser, "firstName" | "lastName" | "email">> {
    password?: string | null;
}

export interface UserFormLogin
    extends Required<Pick<BaseUser, "email" | "password">> {}
