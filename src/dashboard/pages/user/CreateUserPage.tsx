import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserFormInputs } from "../../../shared/interfaces/user.interface";
import { UserForm } from "../../components/user/UserForm";
import { useUserMutation } from "../../";
import { useAppStore } from "../../../shared";
export const CreateUserPage = () => {
    const { createUserMutation } = useUserMutation({
        redirect: "/dashboard/users",
    });
    const userClaimsJwt = useAppStore((state) => state.claims);
    const initialValues: UserFormInputs = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: initialValues,
    });

    const handleForm = (formData: UserFormInputs) =>
        createUserMutation.mutate(formData);
    
    if (!userClaimsJwt?.isAdmin) return <Navigate to="/dashboard/home" />;
    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold">Crear Usuario</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">
                    Llena el siguiente formulario para crear un usuario
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
                    <UserForm
                        register={register}
                        errors={errors}
                        isCreating={true}
                        showFieldEmail={true}
                    />
                    <input
                        type="submit"
                        value="Crear usuario"
                        className="bg-green-600 hover:bg-green-700  w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-md "
                    />
                </form>
            </div>
        </>
    );
};
