
import Logo from "../../assets/logo.svg";
import { useForm } from "react-hook-form";
import { UserFormLogin } from "../../shared/interfaces/user.interface";
import { useAuthMutation } from "../hooks/useAuthMutation";
import { ErrorMessage } from "../../shared";
export const LoginPage = () => {
    const { loginUserMutation } = useAuthMutation();
    const initialValues: UserFormLogin = {
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
    const handleForm = (userFormLogin: UserFormLogin) =>
        loginUserMutation.mutate(userFormLogin);
    return (
        <div className="flex flex-1 items-center justify-center px-6 py-12 lg:px-8">
            <div className="bg-white p-8 py-12 rounded-lg shadow-xl max-w-md w-full space-y-8">
                <div className="text-center">
                    <img
                        className="mx-auto h-36 w-auto"
                        src={Logo}
                        alt="EnergyTop"
                    />
                    <h2 className="mt-6 text-2xl font-bold text-gray-900">
                        Iniciar sesión
                    </h2>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit(handleForm)}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Correo electrónico
                        </label>
                        <input
                            type="text"
                            className="mt-1 w-full rounded-lg border border-gray-300 py-2 px-4 text-gray-700 shadow focus:border-indigo-400 focus:ring-indigo-400 sm:text-sm"
                            {...register("email", {
                                required: "El correo es obligatorio",
                            })}
                        />
                        {errors.email && (
                            <ErrorMessage>{errors.email.message}</ErrorMessage>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            className="mt-1 w-full rounded-lg border border-gray-300 py-2 px-4 text-gray-700 shadow focus:border-indigo-400 focus:ring-indigo-400 sm:text-sm"
                            {...register("password", {
                                required: "La contraseña es obligatorio",
                            })}
                        />
                        {errors.password && (
                            <ErrorMessage>
                                {errors.password.message}
                            </ErrorMessage>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
                    >
                        Iniciar sesión
                    </button>
                </form>
                {/* <p className="text-center text-sm text-gray-600 mt-6">
                    ¿No tienes cuenta?{" "}
                    <Link
                        to="/auth/register"
                        className="text-indigo-600 font-semibold hover:text-indigo-500"
                    >
                        Regístrate
                    </Link>
                </p> */}
            </div>
        </div>
    );
};
