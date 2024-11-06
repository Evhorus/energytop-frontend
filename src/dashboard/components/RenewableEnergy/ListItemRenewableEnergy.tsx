import { Link } from "react-router-dom";
import { Content } from "../../interfaces/renewable-energy-response.interface";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useAppStore } from "../../../shared";

type Props = {
    renewableEnergies: Content;
    index: number;
};

export const ListItemRenewableEnergy = ({
    renewableEnergies,
    index,
}: Props) => {
    const {
        id,
        energyType: { energyName },
        country: { countryName },
        year,
        production,
        consumption,
    } = renewableEnergies;
    const userClaimsJwt = useAppStore((state) => state.claims);

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
                            {energyName}
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
                            {year}
                        </p>
                        <p className="text-sm font-normal text-blue-gray-900 opacity-70"></p>
                    </div>
                </div>
            </td>
            <td className="p-4 text-left">
                <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                        <p className="text-lg font-normal text-blue-gray-900">
                            {production}
                        </p>
                        <p className="text-sm font-normal text-blue-gray-900 opacity-70"></p>
                    </div>
                </div>
            </td>
            <td className="p-4 text-left">
                <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                        <p className="text-lg font-normal text-blue-gray-900">
                            {consumption}
                        </p>
                        <p className="text-sm font-normal text-blue-gray-900 opacity-70"></p>
                    </div>
                </div>
            </td>
            {userClaimsJwt?.isAdmin && (
                <td className="p-4 text-right">
                    <div className="flex gap-2 justify-end">
                        <Link
                            to={`/dashboard/energy-management/renewable-energy/update-renewable-energy/${id}`}
                        >
                            <FaRegEdit
                                size={25}
                                className="hover:text-blue-700"
                            />
                        </Link>
                        {/* <button onClick={() => handleDeleteEnergyType(id)}>
                            <RiDeleteBin5Line
                                size={25}
                                className="hover:text-red-700"
                            />
                        </button> */}
                    </div>
                </td>
            )}
        </tr>
    );
};
