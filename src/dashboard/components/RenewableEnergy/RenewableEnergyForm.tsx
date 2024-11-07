import { FieldErrors, UseFormRegister } from "react-hook-form";
import { RenewableEnergyFormInputs } from "../../interfaces/renewable-energies/renewable-energy.interface";
import { ErrorMessage, Loader } from "../../../shared";
import { useEnergyTypes } from "../../hooks/energy-types/useEnergyTypes";
import { useCountries } from "../../hooks/countries/useCountries";

type Props = {
    register: UseFormRegister<RenewableEnergyFormInputs>;
    errors: FieldErrors<RenewableEnergyFormInputs>;
};
export const RenewableEnergyForm = ({ register, errors }: Props) => {
    const { energyTypes } = useEnergyTypes({ currentPage: 0 });
    const { countries } = useCountries({ currentPage: 0, pageSize: 200 });
    const currentYear = new Date().getFullYear();
    const years = Array.from(
        { length: currentYear - 2015 + 1 },
        (_, i) => 2015 + i
    );

    if (energyTypes.isLoading && energyTypes.isLoading) return <Loader />

    return (
        <>
            <div className="mb-5 space-y-3">
                <label
                    htmlFor="countryName"
                    className="text-sm uppercase font-bold"
                >
                    Tipo de Fuente
                </label>
                <select
                    id="countryName"
                    className="w-full p-3 border border-gray-200"
                    {...register("energyType", {
                        valueAsNumber: true,
                        required: "El tipo de fuente es obligatorio",
                    })}
                >
                    <option value="">Selecciona un un tipo de fuente</option>
                    {energyTypes.data?.content.map((energyType) => (
                        <option key={energyType.id} value={energyType.id}>
                            {energyType.energyName}
                        </option>
                    ))}

                    {/* Agrega más opciones según sea necesario */}
                </select>

                {errors.energyType && (
                    <ErrorMessage>{errors.energyType.message}</ErrorMessage>
                )}
            </div>
            <div className="mb-5 space-y-3">
                <label
                    htmlFor="countryName"
                    className="text-sm uppercase font-bold"
                >
                    País
                </label>
                <select
                    id="countryName"
                    className="w-full p-3 border border-gray-200"
                    {...register("country", {
                        valueAsNumber: true,
                        required: "El pais es obligatorio",
                    })}
                >
                    <option value="">Selecciona un pais</option>
                    {countries.data?.content.map((country) => (
                        <option key={country.id} value={country.id}>
                            {country.countryName}
                        </option>
                    ))}

                    {/* Agrega más opciones según sea necesario */}
                </select>

                {errors.country && (
                    <ErrorMessage>{errors.country.message}</ErrorMessage>
                )}
            </div>
            <div className="mb-5 space-y-3">
                <label htmlFor="year" className="text-sm uppercase font-bold">
                    Año
                </label>
                <select
                    id="year"
                    className="w-full p-3 border border-gray-200"
                    {...register("year", {
                        valueAsNumber: true,
                        required: "El año  es obligatorio",
                    })}
                >
                    <option value="">Selecciona el año</option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>

                {errors.year && (
                    <ErrorMessage>{errors.year.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label
                    htmlFor="production"
                    className="text-sm uppercase font-bold"
                >
                    Produccion
                </label>
                <input
                    id="production"
                    className="w-full p-3  border border-gray-200"
                    type="text"
                    placeholder="Produccion"
                    {...register("production", {
                        required: "La produccion es obligatorio",
                        valueAsNumber: true,
                    })}
                />

                {errors.production && (
                    <ErrorMessage>{errors.production.message}</ErrorMessage>
                )}
            </div>
            <div className="mb-5 space-y-3">
                <label
                    htmlFor="consumption"
                    className="text-sm uppercase font-bold"
                >
                    Consumo
                </label>
                <input
                    id="consumption"
                    className="w-full p-3  border border-gray-200"
                    type="text"
                    placeholder="Consumo"
                    {...register("consumption", {
                        required: "El consumo es obligatorio",
                        valueAsNumber: true,
                    })}
                />

                {errors.consumption && (
                    <ErrorMessage>{errors.consumption.message}</ErrorMessage>
                )}
            </div>
        </>
    );
};
