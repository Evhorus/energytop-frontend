import { Link, Navigate } from "react-router-dom";
import { ListItemUsers, useUser } from "../../";
import { useAppStore } from "../../../shared/store/useAppStore";
import { useState } from "react";
import { Loader } from "../../../shared";
// import { PaginationControls } from "../../components/PaginationControls";
export const ListUsersPage = () => {
    const userClaimsJwt = useAppStore((state) => state.claims);
    // const [currentPage, setCurrentPage] = useState(0);

    const [searchTerm, setSearchTerm] = useState("");
    const [searchBy, setSearchBy] = useState("");

    const { users, searchUsers } = useUser({ searchTerm, searchBy });
    if (users.isLoading) return <Loader />;
    if (!users.data) return null;
    // const { pageSize, totalPages, content } = users.data;
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchBy(e.target.value);
    };
    if (!userClaimsJwt?.isAdmin) return <Navigate to="/dashboard/home" />;
    return (
        <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-xl rounded-xl p-2 overflow-y-auto">
            <div className="relative mx-4 mt-4 overflow-hidden bg-white rounded-none">
                <div className="flex items-center justify-between gap-8 mb-8 mt-4">
                    <h5 className="font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                        Listado de usuarios
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
                                <option value="email">
                                    Correo electronico
                                </option>
                            </select>

                            {searchBy && (
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="w-full px-2 py-2 text-base border rounded-lg text-blue-gray-700"
                                    placeholder={
                                        searchBy === "email"
                                            ? "Buscar por correo electrónico"
                                            : "Buscar"
                                    }
                                />
                            )}
                        </div>
                    </div>
                    {userClaimsJwt?.isAdmin && (
                        <div className="flex gap-2 sm:flex-row">
                            <Link
                                to="/dashboard/users/create-user"
                                className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-white uppercase bg-green-600 hover:bg-green-700 rounded-md shadow-md hover:shadow-md focus:opacity-85 active:opacity-95 transition"
                                type="button"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-4 h-4"
                                >
                                    <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
                                </svg>
                                Agregar Usuario
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            <div className="overflow-y-auto h-200 sm:h-80 md:h-96 lg:h-[30rem] xl:h-[45rem] p-4">
                <table className="w-full mt-4 text-left table-auto min-w-full">
                    <thead>
                        <tr>
                            <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50 text-left">
                                <p className="text-base font-normal text-blue-gray-900 opacity-70">
                                    Usuario
                                </p>
                            </th>
                            <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50 text-center">
                                <p className="text-base font-normal text-blue-gray-900 opacity-70">
                                    Estatus
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
                            searchUsers.data?.length === 0 ? (
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
                                searchUsers.data?.map((user, index) => (
                                    <ListItemUsers key={user.id} user={user} />
                                ))
                            )
                        ) : (
                            users.data.map((user, index) => (
                                <ListItemUsers key={user.id} user={user} />
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {/* {!searchTerm && (
                <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handleNextPage={handleNextPage}
                    handlePreviousPage={handlePreviousPage}
                />
            )} */}
        </div>
    );
};
