import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";

export const RegisterPage = () => {
    return (
        <div className="flex flex-1 items-center justify-center px-6 py-12 lg:px-8">
            <div className="bg-white p-8 py-12 rounded-lg shadow-xl max-w-md w-full space-y-8 ">
                <div className="text-center">
                    <img
                        className="mx-auto h-20 w-auto"
                        src={Logo}
                        alt="EnergyTop"
                    />
                    <h2 className="mt-6 text-2xl font-bold text-gray-900">
                        Crear cuenta
                    </h2>
                </div>
                <form className="space-y-6" action="#" method="POST">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Nombre
                        </label>
                        <input
                            type="text"
                            required
                            className="mt-1 w-full rounded-lg border border-gray-300 py-2 px-4 text-gray-700 shadow focus:border-indigo-400 focus:ring-indigo-400 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Apellido
                        </label>
                        <input
                            type="text"
                            required
                            className="mt-1 w-full rounded-lg border border-gray-300 py-2 px-4 text-gray-700 shadow focus:border-indigo-400 focus:ring-indigo-400 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            required
                            className="mt-1 w-full rounded-lg border border-gray-300 py-2 px-4 text-gray-700 shadow focus:border-indigo-400 focus:ring-indigo-400 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            required
                            className="mt-1 w-full rounded-lg border border-gray-300 py-2 px-4 text-gray-700 shadow focus:border-indigo-400 focus:ring-indigo-400 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Confirmar contraseña
                        </label>
                        <input
                            type="password"
                            required
                            className="mt-1 w-full rounded-lg border border-gray-300 py-2 px-4 text-gray-700 shadow focus:border-indigo-400 focus:ring-indigo-400 sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
                    >
                        Registrarse
                    </button>
                </form>
                <p className="text-center text-sm text-gray-600 mt-6">
                    ¿Ya tienes cuenta?{" "}
                    <Link
                        to="/auth/login"
                        className="text-indigo-600 font-semibold hover:text-indigo-500"
                    >
                        Iniciar sesión
                    </Link>
                </p>
            </div>
        </div>
    );
};
