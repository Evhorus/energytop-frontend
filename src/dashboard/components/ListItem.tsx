import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { UserResponse } from "../../shared/interfaces/user.interface";
import { useUserMutation } from "../";
import { Link } from "react-router-dom";
import { useAppStore } from "../../shared/store/useAppStore";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

type Props = {
    user: UserResponse;
};

export const ListItem = ({ user }: Props) => {
    const userClaimsJwt = useAppStore((state) => state.claims);
    const MySwal = withReactContent(Swal);

    const { deleteUserMutation } = useUserMutation();
    const handleDeleteUser = (userId: UserResponse["id"]) => {
        MySwal.fire({
            title: "¿Estás seguro?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, ¡elimínalo!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteUserMutation.mutate(userId);
            }
        });
    };

    return (

        
        <tr className="border-b">
            {userClaimsJwt?.isAdmin}
            <td className="p-4 text-left">
                <div className="flex items-center gap-3">
                    <img
                        src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg"
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
