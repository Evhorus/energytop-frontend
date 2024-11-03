import { FieldErrors, UseFormRegister } from "react-hook-form";
import { UserFormInputs } from "../../../shared/interfaces/user.interface";
import { ErrorMessage } from "../../../shared";

type Props = {
    register: UseFormRegister<UserFormInputs>;
    errors: FieldErrors<UserFormInputs>;
    isCreating: boolean;
};

export const UserForm = ({ register, errors, isCreating }: Props) => {
    return (
        <>
            <div className="mb-5 space-y-3">
                <label
                    htmlFor="firstName"
                    className="text-sm uppercase font-bold"
                >
                    Nombre
                </label>
                <input
                    id="firstName"
                    className="w-full p-3  border border-gray-200"
                    type="text"
                    placeholder="Nombre del usuario"
                    {...register("firstName", {
                        required: "El Nombre es obligatorio",
                    })}
                />

                {errors.firstName && (
                    <ErrorMessage>{errors.firstName.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label
                    htmlFor="lastName"
                    className="text-sm uppercase font-bold"
                >
                    Apellido
                </label>
                <input
                    id="lastName"
                    className="w-full p-3  border border-gray-200"
                    type="text"
                    placeholder="Apellido del usuario"
                    {...register("lastName", {
                        required: "El Apellido es obligatorio",
                    })}
                />

                {errors.lastName && (
                    <ErrorMessage>{errors.lastName.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="email" className="text-sm uppercase font-bold">
                    Correo electrónico
                </label>
                <input
                    id="email"
                    className="w-full p-3 border border-gray-200"
                    type="text"
                    placeholder="Correo electrónico del usuario"
                    {...register("email", {
                        required: "El Email es obligatorio",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "El formato del Email es inválido",
                        },
                    })}
                />

                {errors.email && (
                    <ErrorMessage>{errors.email.message}</ErrorMessage>
                )}
            </div>
            <div className="mb-5 space-y-3">
                <label
                    htmlFor="password"
                    className="text-sm uppercase font-bold"
                >
                    Contraseña
                </label>
                <input
                    id="password"
                    className="w-full p-3  border border-gray-200"
                    type="password"
                    placeholder="Contraseña del usuario"
                    {...register("password", {
                        required: isCreating
                            ? "La Contraseña es obligatoria"
                            : false,
                    })}
                />
                {isCreating && errors.password && (
                    <ErrorMessage>{errors.password.message}</ErrorMessage>
                )}
            </div>
        </>
    );
};
