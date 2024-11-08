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

    if (countries.isLoading) return <Loader />;
    if (energyTypes.isLoading) return <Loader />;
    if (countries.data?.content && energyTypes.data?.content)
        return (
            <>
                <div className="mb-5 space-y-3">
                    <label
                        htmlFor="energyType"
                        className="text-sm uppercase font-bold"
                    >
                        Tipo de Energía
                    </label>
                    <select
                        id="energyType"
                        className="w-full p-3 border border-gray-200"
                        {...register("energyType", {
                            valueAsNumber: true,
                            required:
                                "El tipo de energía es obligatorio",
                        })}
                    >
                        <option value="">
                            Selecciona el tipo de energía
                        </option>
                        {energyTypes.data?.content.map((energyType) => (
                            <option key={energyType.id} value={energyType.id}>
                                {energyType.energyName}
                            </option>
                        ))}
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
                            required: "El país es obligatorio",
                        })}
                    >
                        <option value="">Selecciona un país</option>
                        {countries.data?.content.map((country) => (
                            <option key={country.id} value={country.id}>
                                {country.countryName}
                            </option>
                        ))}
                    </select>

                    {errors.country && (
                        <ErrorMessage>{errors.country.message}</ErrorMessage>
                    )}
                </div>
                <div className="mb-5 space-y-3">
                    <label
                        htmlFor="year"
                        className="text-sm uppercase font-bold"
                    >
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
                        Producción (kWh)
                    </label>
                    <input
                        id="production"
                        className="w-full p-3  border border-gray-200"
                        type="number"
                        placeholder="Ingresa la cantidad de producción"
                        {...register("production", {
                            required: "La producción es obligatoria",
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
                        Consumo (kWh)
                    </label>
                    <input
                        id="consumption"
                        className="w-full p-3  border border-gray-200"
                        type="number"
                        placeholder="Ingresa la cantidad de consumo"
                        {...register("consumption", {
                            required: "El consumo es obligatorio",
                            valueAsNumber: true,
                        })}
                    />

                    {errors.consumption && (
                        <ErrorMessage>
                            {errors.consumption.message}
                        </ErrorMessage>
                    )}
                </div>
            </>
        );
};
