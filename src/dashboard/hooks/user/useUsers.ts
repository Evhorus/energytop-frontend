import { useQuery } from "@tanstack/react-query";
import { userService } from "../..";
import {
    BaseUser,
    UserResponse,
} from "../../../shared/interfaces/user.interface";

interface Options {
    identifier?: BaseUser["id"] | BaseUser["email"];
    currentPage?: number;
    pageSize?: number;
    searchTerm?: string;
    searchBy?: string;
}

export const useUser = ({
    identifier,
    currentPage,
    pageSize,
    searchBy,
    searchTerm,
}: Options) => {
    const users = useQuery({
        queryKey: ["users"],
        queryFn: userService.findAllUsers,
        retry: 1,
        refetchOnWindowFocus: false,
    });

    const user = useQuery({
        queryKey: ["user", identifier],
        queryFn: () => userService.findUserById(identifier!),
        retry: 1,
        enabled: !!identifier,
        refetchOnWindowFocus: false,
    });

    const searchUsers = useQuery({
        queryKey: ["searchUsers",searchTerm,searchBy],
        queryFn: () => userService.searchUsers(searchTerm!, searchBy!),
        retry: 1,
        enabled: !!searchTerm, // Solo activa esta consulta si hay un término de búsqueda
        refetchOnWindowFocus: false,
    });

    return { users, user, searchUsers };
};
