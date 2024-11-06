import { FieldErrors, UseFormRegister } from "react-hook-form";
import { EnergyTypeFormInputs } from "../../interfaces/energy-types/energy-type.interface";
import { ErrorMessage } from "../../../shared";

type Props = {
    register: UseFormRegister<EnergyTypeFormInputs>;
    errors: FieldErrors<EnergyTypeFormInputs>;
};
export const EnergyTypeForm = ({ register, errors }: Props) => {
    return (
        <>
            <div className="mb-5 space-y-3">
                <label
                    htmlFor="energyName"
                    className="text-sm uppercase font-bold"
                >
                    Nombre
                </label>
                <input
                    id="energyName"
                    className="w-full p-3  border border-gray-200"
                    type="text"
                    placeholder="Nombre del tipo de energía"
                    {...register("energyName", {
                        required: "El Nombre es obligatorio",
                    })}
                />

                {errors.energyName && (
                    <ErrorMessage>{errors.energyName.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="source" className="text-sm uppercase font-bold">
                    Recurso
                </label>
                <input
                    id="source"
                    className="w-full p-3  border border-gray-200"
                    type="text"
                    placeholder="Recurso de la energía"
                    {...register("source", {
                        required: "El recurso es obligatorio",
                    })}
                />

                {errors.source && (
                    <ErrorMessage>{errors.source.message}</ErrorMessage>
                )}
            </div>
        </>
    );
};
