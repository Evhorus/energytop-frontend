import { Link } from "react-router-dom";
import { ListItem, useUser } from "../../";
import { useAppStore } from "../../../shared/store/useAppStore";
export const ListUsersPage = () => {
    const userClaimsJwt = useAppStore((state) => state.claims);
    const { users } = useUser();
    return (
        <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-xl rounded-xl p-2">
            <div className="relative mx-4 mt-4 overflow-hidden bg-white rounded-none">
                <div className="flex items-center justify-between gap-8 mb-8 mt-4">
                    <h5 className="font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                        Listado de usuarios
                    </h5>
                </div>
                <div className="flex items-center justify-between gap-4 md:flex-row">
                    <div className="w-full md:w-72">
                        <div className="relative h-10">
                            <input
                                className="peer w-full h-full px-3 py-2.5 border rounded-lg text-sm text-blue-gray-700 placeholder-transparent focus:border-gray-900 transition outline-none"
                                placeholder="Buscar"
                            />
                            <label className="absolute left-3 top-1 text-gray-500 text-base peer-placeholder-shown:top-2 peer-focus:top-1 peer-focus:text-xs transition-all">
                                Buscar
                            </label>
                        </div>
                    </div>
                    {userClaimsJwt?.isAdmin && (
                        <div className="flex gap-2 sm:flex-row">
                            <Link
                                to="/dashboard/create-user"
                                className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-white uppercase bg-indigo-500 rounded-md shadow-md hover:shadow-md focus:opacity-85 active:opacity-95 transition"
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
            <div className="p-6 overflow-hidden">
                <table className="w-full mt-4 text-left table-auto min-w-max">
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
                        {users.data?.map((user) => (
                            <ListItem key={user.id} user={user} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
