import { useQuery } from "@tanstack/react-query";
import { userService } from "../..";
import { UserResponse } from "../../../shared/interfaces/user.interface";

export const useUser = (
    identifier?: UserResponse["id"] | UserResponse["email"]
) => {
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

    return { users, user };
};
