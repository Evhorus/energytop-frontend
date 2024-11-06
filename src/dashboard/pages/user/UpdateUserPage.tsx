import { Link, Navigate, useParams } from "react-router-dom";
import { UserForm } from "../../components/user/UserForm";
import { UserFormInputs } from "../../../shared/interfaces/user.interface";
import { useForm } from "react-hook-form";
import { useUser, useUserMutation } from "../../";
import { useEffect } from "react";
import { useAppStore } from "../../../shared";

export const UpdateUserPage = () => {
    const userClaimsJwt = useAppStore((state) => state.claims);
    const params = useParams();
    const idUser = +params.id!;
    const { user } = useUser(idUser);
    const { updateUserMutation } = useUserMutation({
        redirect: "/dashboard/users",
        identifier: user.data?.id,
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
            idUser,
            formData: {
                ...rest,
                password: password ? password : null,
            },
        };
        updateUserMutation.mutate(formWithId);
    };

    if (user.isLoading) return <p>Loading...</p>;
    if (!userClaimsJwt?.isAdmin) return <Navigate to="/dashboard/home" />;
    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold">Actualizar Usuario</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">
                    Modifica el siguiente formulario para actualizar el usuario
                </p>
                <nav className="my-5">
                    <Link
                        to="/dashboard/users"
                        className="bg-slate-600 hover:bg-slate-800 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-md "
                    >
                        Volver
                    </Link>
                </nav>

                <form
                    onSubmit={handleSubmit(handleForm)}
                    className="my-10 bg-white shadow-lg p-10 rounded-lg"
                    noValidate
                >
                    <div className="p-6.5">
                        <UserForm
                            register={register}
                            errors={errors}
                            isCreating={false}
                            showFieldEmail={true}
                        />
                        <input
                            type="submit"
                            value="Actualizar usuario"
                            className="bg-green-600 hover:bg-green-700  w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-md "
                        />
                    </div>
                </form>
            </div>
        </>
    );
};
