import { useState } from "react";
import { ListItemRenewableEnergies } from "../../components/RenewableEnergies/ListItemRenewableEnergies";
import { useRenewableEnergy } from "../../hooks/renewable-energy/useRenewableEnergy";
import { PaginationControls } from "../../components/PaginationControls";

export const RenewableEnergiesListPage = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const { renewableEnergies } = useRenewableEnergy(currentPage);
    if (renewableEnergies.isLoading) return <div>Loading...</div>;
    if (!renewableEnergies.data) return null;

    const { size, totalPages, content } = renewableEnergies.data;
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
    return (
        <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-xl rounded-xl p-2 overflow-y-auto">
            <div className="relative mx-4 mt-4 overflow-hidden bg-white rounded-none">
                <div className="flex items-center justify-between gap-8 mb-8 mt-4">
                    <h5 className="font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                        Listado de energías renovables
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
                </div>
            </div>
            <div className="overflow-x-auto p-6">
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
                        </tr>
                    </thead>
                    <tbody>
                        {content.map((renewableEnergy, index) => (
                            <ListItemRenewableEnergies
                                key={renewableEnergy.id}
                                renewableEnergies={renewableEnergy}
                                index={index + currentPage * size + 1}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
            />
        </div>
    );
};
