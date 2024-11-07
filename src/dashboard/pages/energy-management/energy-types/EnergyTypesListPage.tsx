import { useState } from "react";
import { useEnergyTypes } from "../../../hooks/energy-types/useEnergyTypes";
import { PaginationControls } from "../../../components/PaginationControls";
import { ListItemEnergyTypes } from "../../../components/EnergyTypes/ListItemEnergyTypes";
import { Loader, useAppStore } from "../../../../shared";
import { Link } from "react-router-dom";
import { IoAddOutline } from "react-icons/io5";

export const EnergyTypesListPage = () => {
    const userClaimsJwt = useAppStore((state) => state.claims);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchBy, setSearchBy] = useState("");
    const { energyTypes } = useEnergyTypes({
        currentPage,
    });

    const { searchEnergyTypes } = useEnergyTypes({
        searchTerm,
        searchBy,
    });

    if (energyTypes.isLoading) return <Loader />;
    if (!energyTypes.data) return null;
    const { pageSize, totalPages, content } = energyTypes.data;
    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage((prev) => prev + 1);
        }
    };
    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchBy(e.target.value);
    };
    return (
        <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-xl rounded-xl p-2 overflow-y-auto">
            <div className="relative mx-4 mt-4 overflow-hidden bg-white rounded-none ">
                <div className="flex items-center justify-between gap-8 mb-8 mt-4">
                    <h5 className="font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                        Listado tipos de energías renovables
                    </h5>
                </div>
                <div className="flex items-center justify-between gap-4 md:flex-row">
                    <div className="w-full md:w-80">
                        <div className="flex flex-col space-y-3">
                            <select
                                value={searchBy}
                                onChange={handleSelectChange}
                                className="w-full px-2.5 py-2.5 text-base border rounded-lg text-blue-gray-70"
                            >
                                <option value="">
                                    Selecciona un criterio de búsqueda
                                </option>
                                <option value="energyName">
                                    Tipo de energia
                                </option>
                            </select>
                            {searchBy && (
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="w-full px-2 py-2 text-base border rounded-lg text-blue-gray-700"
                                    placeholder={
                                        searchBy === "energyName"
                                            ? "Buscar por tipo de energia"
                                            : "Buscar"
                                    }
                                />
                            )}
                        </div>
                    </div>
                    {userClaimsJwt?.isAdmin && (
                        <div className="flex gap-2 sm:flex-row">
                            <Link
                                to="/dashboard/energy-management/energy-types/create-energy-type"
                                className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-white uppercase bg-green-600 hover:bg-green-700 rounded-md shadow-md hover:shadow-md focus:opacity-85 active:opacity-95 transition"
                                type="button"
                            >
                                <IoAddOutline size={25} /> Agregar Tipo de
                                energia
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            <div className="overflow-y-auto h-200 sm:h-80 md:h-96 lg:h-[30rem] xl:h-[45rem] p-4">
                <table className="w-full mt-4 text-left table-auto min-w-full">
                    <thead>
                        <tr>
                            <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                <p className="text-base font-normal text-blue-gray-900 opacity-70">
                                    #
                                </p>
                            </th>
                            <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                <p className="text-base font-normal text-blue-gray-900 opacity-70">
                                    Tipo De Energía
                                </p>
                            </th>
                            <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                <p className="text-base font-normal text-blue-gray-900 opacity-70">
                                    Recurso
                                </p>
                            </th>
                            {userClaimsJwt?.isAdmin && (
                                <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50 text-right">
                                    <p className="text-base font-normal text-blue-gray-900 opacity-70">
                                        Acciones
                                    </p>
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {searchTerm ? (
                            searchEnergyTypes.data?.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="text-center text-gray-500 py-4"
                                    >
                                        <span className="font-semibold text-xl">
                                            Ups, no encontramos tipos de
                                            energías
                                        </span>
                                        <p className="text-sm text-gray-400">
                                            No hay tipos de energías con ese
                                            nombre o no existe.
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                searchEnergyTypes.data?.map(
                                    (energyType, index) => (
                                        <ListItemEnergyTypes
                                            key={energyType.id}
                                            energyType={energyType}
                                            index={
                                                index +
                                                currentPage * pageSize +
                                                1
                                            }
                                        />
                                    )
                                )
                            )
                        ) : (
                            content.map((energyType, index) => (
                                <ListItemEnergyTypes
                                    key={energyType.id}
                                    energyType={energyType}
                                    index={index + currentPage * pageSize + 1}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {!searchTerm && (
                <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handleNextPage={handleNextPage}
                    handlePreviousPage={handlePreviousPage}
                />
            )}
        </div>
    );
};
