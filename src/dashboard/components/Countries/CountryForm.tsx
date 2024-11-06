import { FieldErrors, UseFormRegister } from "react-hook-form";
import { CountryFormInputs } from "../../interfaces/countries/countries.interface";
import { ErrorMessage } from "../../../shared";

type Props = {
    register: UseFormRegister<CountryFormInputs>;
    errors: FieldErrors<CountryFormInputs>;
};
export const CountryForm = ({ register, errors }: Props) => {
    return (
        <>
            <div className="mb-5 space-y-3">
                <label
                    htmlFor="countryName"
                    className="text-sm uppercase font-bold"
                >
                    Nombre
                </label>
                <input
                    id="countryName"
                    className="w-full p-3  border border-gray-200"
                    type="text"
                    placeholder="Nombre del país"
                    {...register("countryName", {
                        required: "El Nombre es obligatorio",
                    })}
                />

                {errors.countryName && (
                    <ErrorMessage>{errors.countryName.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="countryCode" className="text-sm uppercase font-bold">
                    Codigo
                </label>
                <input
                    id="countryCode"
                    className="w-full p-3  border border-gray-200"
                    type="text"
                    placeholder="Codigo del país"
                    {...register("countryCode", {
                        required: "El codigo es obligatorio",
                    })}
                />

                {errors.countryCode && (
                    <ErrorMessage>{errors.countryCode.message}</ErrorMessage>
                )}
            </div>
            <div className="mb-5 space-y-3">
                <label htmlFor="population" className="text-sm uppercase font-bold">
                    Poblacion
                </label>
                <input
                    id="population"
                    className="w-full p-3  border border-gray-200"
                    type="text"
                    placeholder="Codigo del país"
                    {...register("population", {
                        required: "La poblacion es obligatorio",
                    })}
                />

                {errors.population && (
                    <ErrorMessage>{errors.population.message}</ErrorMessage>
                )}
            </div>
        </>
    );
};
