import { Link } from "react-router-dom";
import { Loader, useAppStore } from "../../../../shared";
import { useCountries } from "../../../hooks/countries/useCountries";
import { useState } from "react";
import { PaginationControls } from "../../../components/PaginationControls";
import { IoAddOutline } from "react-icons/io5";
import { ListItemCountry } from "../../../components/Countries/ListItemCountry";

export const CountriesListPage = () => {
    const userClaimsJwt = useAppStore((state) => state.claims);
    const [currentPage, setCurrentPage] = useState(0);
    const { countries } = useCountries({
        currentPage,
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [searchBy, setSearchBy] = useState("countryName");

    const { searchCountries } = useCountries({
        searchTerm,
        searchBy,
    });
    if (countries.isLoading) return <Loader />;
    if (!countries.data) return null;
    const { pageSize, totalPages, content } = countries.data;
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
                        Listado países
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
                                <option value="countryName">País</option>
                                <option value="countryCode">
                                    Codigo de pais
                                </option>
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
                                to="/dashboard/energy-management/countries/create-country"
                                className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-white uppercase bg-green-600 hover:bg-green-700 rounded-md shadow-md hover:shadow-md focus:opacity-85 active:opacity-95 transition"
                                type="button"
                            >
                                <IoAddOutline size={25} /> Agregar Pais
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
                                    Pais
                                </p>
                            </th>
                            <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                <p className="text-base font-normal text-blue-gray-900 opacity-70">
                                    Codigo
                                </p>
                            </th>
                            <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                <p className="text-base font-normal text-blue-gray-900 opacity-70">
                                    Población
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
                            searchCountries.data?.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="text-center text-gray-500 py-4"
                                    >
                                        <span className="font-semibold text-xl">
                                            Ups, no encontramos países
                                        </span>
                                        <p className="text-sm text-gray-400">
                                            No hay países con ese nombre o no
                                            existe.
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                searchCountries.data?.map((country, index) => (
                                    <ListItemCountry
                                        key={country.id}
                                        country={country}
                                        index={
                                            index + currentPage * pageSize + 1
                                        }
                                        searchTerm={searchTerm}
                                        searchBy={searchBy}
                                    />
                                ))
                            )
                        ) : (
                            content.map((country, index) => (
                                <ListItemCountry
                                    key={country.id}
                                    country={country}
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
