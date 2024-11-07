import { Link } from "react-router-dom";
import { useAppStore } from "../../../shared";
import { useCountriesMutation } from "../../hooks/countries/useCountriesMutation";
import { BaseCountry } from "../../interfaces/countries/countries.interface";
import { showNotification } from "../Notification";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

type Props = {
    index: number;
    country: BaseCountry;
    searchTerm?: string;
    searchBy?: string;
};
export const ListItemCountry = ({
    index,
    country,
    searchBy,
    searchTerm,
}: Props) => {
    const userClaimsJwt = useAppStore((state) => state.claims);
    const { countryName, countryCode, population } = country;

    const { deleteCountryMutation } = useCountriesMutation({
        searchBy,
        searchTerm,
    });

    const handleDeleteEnergyType = (energyTypeId: BaseCountry["id"]) => {
        showNotification({
            title: "¿Estás seguro?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            confirmButtonText: "Sí, ¡elimínalo!",
            confirmButtonColor: "#3085d6",
            cancelButtonText: "Cancelar",
            cancelButtonColor: "#d33",
            showCancelButton: true,
            onConfirm: () => {
                deleteCountryMutation.mutate(energyTypeId);
            },
        });
    };
    return (
        <tr className="border-b">
            <td className="p-4 text-left">
                <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                        <p className="text-lg font-normal text-blue-gray-900">
                            {index}
                        </p>
                        <p className="text-sm font-normal text-blue-gray-900 opacity-70"></p>
                    </div>
                </div>
            </td>
            <td className="p-4 text-left">
                <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                        <p className="text-lg font-normal text-blue-gray-900">
                            {countryName}
                        </p>
                        <p className="text-sm font-normal text-blue-gray-900 opacity-70"></p>
                    </div>
                </div>
            </td>
            <td className="p-4 text-left">
                <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                        <p className="text-lg font-normal text-blue-gray-900">
                            {countryCode}
                        </p>
                        <p className="text-sm font-normal text-blue-gray-900 opacity-70"></p>
                    </div>
                </div>
            </td>
            <td className="p-4 text-left">
                <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                        <p className="text-lg font-normal text-blue-gray-900">
                            {population}
                        </p>
                        <p className="text-sm font-normal text-blue-gray-900 opacity-70"></p>
                    </div>
                </div>
            </td>
            {userClaimsJwt?.isAdmin && (
                <td className="p-4 text-right">
                    <div className="flex gap-2 justify-end">
                        <Link
                            to={`/dashboard/energy-management/countries/update-country/${country.id}`}
                        >
                            <FaRegEdit
                                size={25}
                                className="hover:text-blue-700"
                            />
                        </Link>
                        <button
                            onClick={() => handleDeleteEnergyType(country.id)}
                        >
                            <RiDeleteBin5Line
                                size={25}
                                className="hover:text-red-700"
                            />
                        </button>
                    </div>
                </td>
            )}
        </tr>
    );
};
