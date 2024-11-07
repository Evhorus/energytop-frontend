import { useForm } from "react-hook-form";
import { Loader, useAppStore } from "../../../shared";
import { UserFormInputs } from "../../../shared/interfaces/user.interface";
import { useUser } from "../../hooks/user/useUsers";
import { useUserMutation } from "../../hooks/user/useUsersMutation";
import { useEffect } from "react";
import { UserForm } from "../../components/user/UserForm";

export const MyAccountPage = () => {
    const claims = useAppStore((state) => state.claims);
    const { user } = useUser({ identifier: claims?.email! });
    const { updateUserProfileMutation } = useUserMutation({
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
        const formWithEmail = {
            email: user.data?.email!,
            formData: {
                ...rest,
                password: password ? password : null,
            },
        };
        updateUserProfileMutation.mutate(formWithEmail);
    };
    if (user.isLoading) return <Loader />;
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
                        isUpdatingProfile={true}
                    />
                    <input
                        type="submit"
                        value="Actualizar perfil"
                        className="bg-green-600 hover:bg-green-700  w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-md "
                    />
                </form>
            </div>
        </>
    );
};
