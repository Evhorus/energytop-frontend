import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AdvancedEnergySearchFormInputs } from "../../interfaces/advanced-energy-search-inputs.interface";
import { useRenewableEnergies } from "../../hooks/renewable-energy/useRenewableEnergies";
import { CiSearch } from "react-icons/ci";
import { useEnergyTypes } from "../../hooks/energy-types/useEnergyTypes";
import { Loader } from "../../../shared";

export const EnergyTypeYearSearchForm = () => {
    const [isButtonVisible, setButtonVisible] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const { energyTypes } = useEnergyTypes({ currentPage: 0 });

    const currentYear = new Date().getFullYear();
    const years = Array.from(
        { length: currentYear - 2010 + 1 },
        (_, i) => 2010 + i
    );

    const [searchParams, setSearchParams] = useState({
        energyTypeName: "",
        year: 2015,
    });

    const { register, handleSubmit, watch } =
        useForm<AdvancedEnergySearchFormInputs>({
            defaultValues: {
                energyTypeName: "",
                year: 2024,
            },
        });
    const selectedEnergyType = watch("energyTypeName");

    useEffect(() => {
        if (selectedEnergyType) {
            setButtonVisible(true);
            setTimeout(() => setFadeIn(true), 50);
        } else {
            setFadeIn(false);
            setTimeout(() => setButtonVisible(false), 300);
        }
    }, [selectedEnergyType]);

    const { totalRenewableEnergy } = useRenewableEnergies({
        energyBySourceAndCountry: searchParams,
    });

    const onSearchByEnergyTypeNameAndYear = (
        formData: AdvancedEnergySearchFormInputs
    ) => {
        const { energyTypeName, year } = formData;
        if (energyTypeName && year) {
            setSearchParams({ energyTypeName, year });
            setHasSearched(true);
        }
    };

    // Calcula la producción total sumando todas las producciones
    const totalProduction = totalRenewableEnergy.data
        ? totalRenewableEnergy.data.reduce(
              (acc, item) => acc + (item.totalProduction || 0),
              0
          )
        : 0;

    return (
        <>
            <div className="bg-gray-50 shadow-md rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-700 mb-4">
                    Buscar Producción Total
                </h2>
                <form
                    onSubmit={handleSubmit(onSearchByEnergyTypeNameAndYear)}
                    className="space-y-4"
                >
                    <div className="flex flex-col md:flex-row md:items-end md:space-x-4">
                        <div className="flex-1 mb-4 md:mb-0">
                            <label className="block text-gray-600 font-medium mb-1">
                                Tipo de Fuente
                            </label>
                            <select
                                {...register("energyTypeName")}
                                className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Selecciona...</option>
                                {energyTypes.data?.content.map((source) => (
                                    <option
                                        key={source.id}
                                        value={source.energyName}
                                    >
                                        {source.energyName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1 mb-4 md:mb-0">
                            <label className="block text-gray-600 font-medium mb-1">
                                Año
                            </label>
                            <select
                                {...register("year")}
                                className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Selecciona...</option>
                                {years.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {isButtonVisible && (
                            <div
                                className={`mt-4 md:mt-0 transition-all duration-300 ${
                                    fadeIn
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-2"
                                }`}
                            >
                                <button
                                    type="submit"
                                    className="flex items-center p-2 justify-center bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition duration-300 transform scale-100 hover:scale-105"
                                    aria-label="Buscar"
                                >
                                    <CiSearch size={25} /> Buscar
                                </button>
                            </div>
                        )}
                    </div>
                </form>
            </div>

            {totalRenewableEnergy.isLoading && (
                <div className="mt-8 text-center">
                    <Loader />
                </div>
            )}
            {hasSearched &&
            selectedEnergyType &&
            totalRenewableEnergy.data &&
            totalRenewableEnergy.data.length > 0 ? (
                <div className="mt-8 max-w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    <h2 className="text-xl font-bold text-gray-800 px-6 py-4 border-b border-gray-200">
                        Resultados de Energía Renovable
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead className="bg-gray-200 border-b border-gray-300">
                                <tr>
                                    <th className="px-6 py-3 text-left text-gray-700 font-semibold uppercase tracking-wider">
                                        #
                                    </th>
                                    <th className="px-6 py-3 text-left text-gray-700 font-semibold uppercase tracking-wider">
                                        País
                                    </th>
                                    <th className="px-6 py-3 text-left text-gray-700 font-semibold uppercase tracking-wider">
                                        Tipo de Energía
                                    </th>
                                    <th className="px-6 py-3 text-left text-gray-700 font-semibold uppercase tracking-wider">
                                        Año
                                    </th>
                                    <th className="px-6 py-3 text-left text-gray-700 font-semibold uppercase tracking-wider">
                                        Producción (MW)
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {totalRenewableEnergy.data.map(
                                    (item, index) => (
                                        <tr
                                            key={index}
                                            className={`${
                                                index % 2 === 0
                                                    ? "bg-white"
                                                    : "bg-gray-50"
                                            } hover:bg-gray-100 transition duration-300`}
                                        >
                                            <td className="px-6 py-4 text-gray-800 border-b border-gray-200">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4 text-gray-800 border-b border-gray-200">
                                                {item.country}
                                            </td>
                                            <td className="px-6 py-4 text-gray-800 border-b border-gray-200">
                                                {item.energyType}
                                            </td>
                                            <td className="px-6 py-4 text-gray-800 border-b border-gray-200">
                                                {item.year}
                                            </td>
                                            <td className="px-6 py-4 text-gray-800 border-b border-gray-200 font-medium">
                                                {item.totalProduction.toFixed(
                                                    2
                                                )}
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                            <tfoot>
                                <tr className="bg-gray-100">
                                    <td
                                        colSpan={4}
                                        className="px-6 py-4 text-right font-bold text-gray-700"
                                    >
                                        Producción Total :
                                    </td>
                                    <td className="px-6 py-4 text-gray-800 font-medium">
                                        {totalProduction.toFixed(2)} (MW)
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            ) : hasSearched && totalRenewableEnergy.data?.length === 0 ? (
                <div className="mt-8 text-center text-gray-500">
                    <span className="font-semibold text-xl">
                        Ups, no se encontraron registros
                    </span>
                    <p className="text-sm text-gray-400">
                        No hay registros de energías renovables que coincidan
                        con esa búsqueda.
                    </p>
                </div>
            ) : null}
        </>
    );
};
