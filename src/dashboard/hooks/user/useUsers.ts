import { useQuery } from "@tanstack/react-query";
import { userService } from "../..";

export const useUser = (id?: number) => {
    const users = useQuery({
        queryKey: ["users"],
        queryFn: userService.findAllUsers,
        retry: 1,
        refetchOnWindowFocus: false,
    });

    const user = useQuery({
        queryKey: ["user"],
        queryFn: () => userService.findUserById(id!),
        retry: 1,
        enabled: !!id,
        refetchOnWindowFocus: false,
    });

    return { users, user };
};
