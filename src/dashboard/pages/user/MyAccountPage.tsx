import { useForm } from "react-hook-form";
import { useAppStore } from "../../../shared";
import { UserFormInputs } from "../../../shared/interfaces/user.interface";
import { useUser } from "../../hooks/user/useUsers";
import { useUserMutation } from "../../hooks/user/useUsersMutation";
import { useEffect } from "react";
import { UserForm } from "../../components/user/UserForm";

export const MyAccountPage = () => {
    const claims = useAppStore((state) => state.claims);
    const { user } = useUser(claims?.email!);
    const { updateUserMutation } = useUserMutation({
        redirect: "/dashboard/home",
        identifier: claims?.email!,
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UserFormInputs>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
    });

    useEffect(() => {
        if (user.data) {
            reset({
                firstName: user.data.firstName,
                lastName: user.data.lastName || "",
                email: user.data.email || "",
                password: "",
            });
        }
    }, [user.data, reset]);

    const handleForm = (formData: UserFormInputs) => {
        const { password, ...rest } = formData;
        const formWithId = {
            idUser: user.data?.id!,
            formData: {
                ...rest,
                password: password ? password : null,
            },
        };
        updateUserMutation.mutate(formWithId);
    };
    if (user.isLoading) return <p>Loading...</p>;
    return (
        <>
            <div className="mx-auto max-w-3xl g">
                <h1 className="text-5xl font-black ">Mi Perfil</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">
                    Aquí puedes actualizar tu información
                </p>

                <form
                    onSubmit={handleSubmit(handleForm)}
                    className="my-10 bg-white shadow-lg p-10 rounded-lg"
                    noValidate
                >
                    <UserForm
                        register={register}
                        errors={errors}
                        isCreating={false}
                        showFieldEmail={false}
                    />
                    <input
                        type="submit"
                        value="Actualizar usuario"
                        className="bg-green-600 hover:bg-green-700  w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-md "
                    />
                </form>
            </div>
        </>
    );
};
