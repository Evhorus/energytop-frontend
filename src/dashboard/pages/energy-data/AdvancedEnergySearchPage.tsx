import { useState } from "react";
import { EnergyTypeYearSearchForm } from "../../components/RenewableEnergy/EnergyTypeYearSearchForm";
export const AdvancedEnergySearchPage = () => {
    const [selectedAction, setSelectedAction] = useState<string>("");
    const options = [
        { value: "", label: "Selecciona..." },
        {
            value: "totalProductionBySourceAndYear",
            label: "Producción total por tipo de fuente y año (agrupada por regiones | países)",
        },
        {
            value: "renewablePercentageByCountry",
            label: "Porcentaje de energía renovable en consumo total por país",
        },
        {
            value: "installedCapacityTrend",
            label: "Tendencia de capacidad instalada por tipo de energía",
        },
        {
            value: "topWindEnergyCountries",
            label: "Top 10 países en producción de energía eólica",
        },
    ];

    const handleActionChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ): void => {
        setSelectedAction(event.target.value);
    };

    return (
        <div className="max-w-7xl mx-auto p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Búsqueda Avanzada de Energías Renovables
            </h2>
            <div className="space-y-6">
                <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                        Selecciona una acción
                    </label>
                    <select
                        value={selectedAction}
                        onChange={handleActionChange}
                        className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedAction === "totalProductionBySourceAndYear" && (
                    <EnergyTypeYearSearchForm />
                )}

            </div>
        </div>
    );
};
