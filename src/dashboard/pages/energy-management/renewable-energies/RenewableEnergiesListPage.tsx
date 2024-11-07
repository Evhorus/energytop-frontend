import { useState } from "react";
import { PaginationControls } from "../../../components/PaginationControls";
import { ListItemRenewableEnergy } from "../../../components/RenewableEnergy/ListItemRenewableEnergy";
import { useRenewableEnergies } from "../../../hooks/renewable-energy/useRenewableEnergies";
import { Loader, useAppStore } from "../../../../shared";
import { Link } from "react-router-dom";
import { IoAddOutline } from "react-icons/io5";

export const RenewableEnergiesListPage = () => {
    const userClaimsJwt = useAppStore((state) => state.claims);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchBy, setSearchBy] = useState("energyName");
    const { renewableEnergies } = useRenewableEnergies({
        currentPage,
        listEnergies: true,
    });

    const { searchRenewableEnergies } = useRenewableEnergies({
        searchTerm,
        searchBy,
    });

    if (renewableEnergies.isLoading) return <Loader />;
    if (!renewableEnergies.data) return null;
    const { pageSize, totalPages, content } = renewableEnergies.data;
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
                        Listado de energías renovables
                    </h5>
                </div>
                <div className="flex items-center justify-between gap-4 md:flex-row">
                    <div className="w-full md:w-96">
                        {" "}
                        {/* Cambié el ancho a más grande */}
                        <div className="flex items-center space-x-2">
                            {/* Selector */}
                            <select
                                value={searchBy}
                                onChange={handleSelectChange}
                                className="h-full px-3 py-2 border rounded-lg text-sm text-blue-gray-700 bg-transparent focus:border-gray-900 transition-all outline-none"
                            >
                                <option value="energyName">
                                    {" "}
                                    Tipo de energia
                                </option>
                                <option value="countryName">País</option>
                                {/* Añadir más opciones según sea necesario */}
                            </select>

                            {/* Input de búsqueda más ancho */}
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="w-full h-full px-3 py-2.5 border rounded-lg text-sm text-blue-gray-700 focus:border-gray-900 transition outline-none"
                                placeholder="Buscar"
                            />
                        </div>
                    </div>
                    {userClaimsJwt?.isAdmin && (
                        <div className="flex gap-2 sm:flex-row">
                            <Link
                                to="/dashboard/energy-management/renewable-energies/create-renewable-energy"
                                className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-white uppercase bg-green-600 hover:bg-green-700 rounded-md shadow-md hover:shadow-md focus:opacity-85 active:opacity-95 transition"
                                type="button"
                            >
                                <IoAddOutline size={25} /> Agregar registro
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
                                    País
                                </p>
                            </th>
                            <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                <p className="text-base font-normal text-blue-gray-900 opacity-70">
                                    Año
                                </p>
                            </th>
                            <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                <p className="text-base font-normal text-blue-gray-900 opacity-70">
                                    Producción
                                </p>
                            </th>
                            <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                <p className="text-base font-normal text-blue-gray-900 opacity-70">
                                    Consumo
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
                            searchRenewableEnergies.data?.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={10}
                                        className="text-center text-gray-500 py-4"
                                    >
                                        <span className="font-semibold text-xl">
                                            Ups, no se encontraron registros
                                        </span>
                                        <p className="text-sm text-gray-400">
                                            No hay registros de energías
                                            renovables que coincidan con esa
                                            búsqueda.
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                searchRenewableEnergies.data?.map(
                                    (renewableEnergy, index) => (
                                        <ListItemRenewableEnergy
                                            key={renewableEnergy.id}
                                            renewableEnergy={renewableEnergy}
                                            index={
                                                index +
                                                currentPage * pageSize +
                                                1
                                            }
                                            searchTerm={searchTerm}
                                            searchBy={searchBy}
                                        />
                                    )
                                )
                            )
                        ) : (
                            content.map((renewableEnergy, index) => (
                                <ListItemRenewableEnergy
                                    key={renewableEnergy.id}
                                    renewableEnergy={renewableEnergy}
                                    index={index + currentPage * pageSize + 1}
                                    searchTerm={searchTerm}
                                    searchBy={searchBy}
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
