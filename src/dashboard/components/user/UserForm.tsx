import { FieldErrors, UseFormRegister } from "react-hook-form";
import { UserFormInputs } from "../../../shared/interfaces/user.interface";
import { ErrorMessage } from "../../../shared";
import { useState } from "react";

type Props = {
    register: UseFormRegister<UserFormInputs>;
    errors: FieldErrors<UserFormInputs>;
    isCreating: boolean;
    showFieldEmail?: boolean;
    isUpdatingProfile?: boolean; // Nuevo prop para indicar si estamos en modo actualización
};

export const UserForm = ({
    register,
    errors,
    isCreating,
    showFieldEmail,
    isUpdatingProfile = false,
}: Props) => {
    // Estado para controlar la visibilidad del campo de contraseña
    const [showPassword, setShowPassword] = useState(isCreating);

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
                    className="w-full p-3 border border-gray-200"
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
                    className="w-full p-3 border border-gray-200"
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

            {showFieldEmail && (
                <div className="mb-5 space-y-3">
                    <label
                        htmlFor="email"
                        className="text-sm uppercase font-bold"
                    >
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
            )}

            {/* Switch para activar/desactivar el campo de contraseña en actualización */}
            {isUpdatingProfile && (
                <div className="mb-5">
                    <div className="flex items-center justify-between">
                        <label
                            htmlFor="togglePassword"
                            className="text-sm uppercase font-bold"
                        >
                            Cambiar contraseña
                        </label>
                        <div
                            onClick={() => setShowPassword(!showPassword)}
                            className={`relative inline-block w-12 h-6 transition duration-200 ease-in ${
                                showPassword ? "bg-blue-500" : "bg-gray-300"
                            } rounded-full cursor-pointer`}
                        >
                            <span
                                className={`absolute top-1 left-1 w-4 h-4 transition-transform duration-200 ease-in transform bg-white rounded-full ${
                                    showPassword ? "translate-x-6" : ""
                                }`}
                            />
                        </div>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                        Activa esta opción si deseas actualizar la contraseña.
                    </p>
                </div>
            )}

            {showPassword && (
                <div className="mb-5 space-y-3">
                    <label
                        htmlFor="password"
                        className="text-sm uppercase font-bold"
                    >
                        Contraseña
                    </label>
                    <input
                        id="password"
                        className="w-full p-3 border border-gray-200"
                        type="password"
                        placeholder="Contraseña del usuario"
                        {...register("password", {
                            required: isCreating
                                ? "La Contraseña es obligatoria"
                                : false,
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>
            )}
        </>
    );
};
