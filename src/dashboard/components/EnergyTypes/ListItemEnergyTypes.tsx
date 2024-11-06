import { Link } from "react-router-dom";
import { useAppStore } from "../../../shared";
import { FaRegEdit } from "react-icons/fa";
import { BaseEnergyType } from "../../interfaces/energy-types/energy-type.interface";
import { showNotification } from "../Notification";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useEnergyTypesMutation } from "../../hooks/energy-types/useEnergyTypesMutation";

type Props = {
    index: number;
    energyType: BaseEnergyType;
};

export const ListItemEnergyTypes = ({ energyType, index }: Props) => {
    const userClaimsJwt = useAppStore((state) => state.claims);
    const { energyName, source } = energyType;

    const {deleteEnergyTypeMutation} = useEnergyTypesMutation({})

    const handleDeleteEnergyType = (energyTypeId: BaseEnergyType["id"]) => {
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
                deleteEnergyTypeMutation.mutate(energyTypeId);
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
                            {source}
                        </p>
                        <p className="text-sm font-normal text-blue-gray-900 opacity-70"></p>
                    </div>
                </div>
            </td>
            {userClaimsJwt?.isAdmin && (
                <td className="p-4 text-right">
                    <div className="flex gap-2 justify-end">
                        <Link
                            to={`/dashboard/energy-management/energy-types/update-energy-type/${energyType.id}`}
                        >
                            <FaRegEdit size={25}  className="hover:text-blue-700"/>
                        </Link>
                        <button
                            onClick={() =>
                                handleDeleteEnergyType(energyType.id)
                            }
                        >
                            <RiDeleteBin5Line size={25} className="hover:text-red-700"/>
                        </button>
                    </div>
                </td>
            )}
        </tr>
    );
};
