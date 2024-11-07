import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { UserResponse } from "../../../shared/interfaces/user.interface";
import { useUserMutation } from "../../hooks/user/useUsersMutation";
import { useAppStore } from "../../../shared";
import { showNotification } from "../Notification";

type Props = {
    user: UserResponse;
};

export const ListItemUsers = ({ user }: Props) => {
    const userClaimsJwt = useAppStore((state) => state.claims);
    const { deleteUserMutation } = useUserMutation({});
    const handleDeleteUser = (userId: UserResponse["id"]) => {
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
                deleteUserMutation.mutate(userId);
            },
        });
    };

    return (
        <tr className="border-b">
            <td className="p-4 text-left">
                <div className="flex items-center gap-3">
                    <img
                        src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-6.jpg"
                        alt="John Michael"
                        className="h-9 w-9 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                        <p className="text-lg font-normal text-blue-gray-900">
                            {user.firstName} {user.lastName}
                        </p>
                        <p className="text-sm font-normal text-blue-gray-900 opacity-70">
                            {user.email}
                        </p>
                    </div>
                </div>
            </td>
            <td className="p-4 text-center">
                <span className="px-2 py-1 text-xs font-bold text-green-900 uppercase bg-green-500/20 rounded-md">
                    Activado
                </span>
            </td>
            {userClaimsJwt?.isAdmin && (
                <td className="p-4 text-right">
                    <div className="flex gap-2 justify-end">
                        <Link to={`/dashboard/users/update-user/${user.id}`}>
                            <FaRegEdit size={25} />
                        </Link>
                        <button onClick={() => handleDeleteUser(user.id)}>
                            <RiDeleteBin5Line size={25} />
                        </button>
                    </div>
                </td>
            )}
        </tr>
    );
};
