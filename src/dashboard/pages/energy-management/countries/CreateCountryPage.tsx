import { useForm } from "react-hook-form";
import { useCountriesMutation } from "../../../hooks/countries/useCountriesMutation";
import { CountryFormInputs } from "../../../interfaces/countries/countries.interface";
import { Link } from "react-router-dom";
import { CountryForm } from "../../../components/Countries/CountryForm";

export const CreateCountryPage = () => {
    const { createCountryMutation } = useCountriesMutation({
        redirect: "/dashboard/energy-management/energy-types",
    });
    const initialValues: CountryFormInputs = {
        countryName: "",
        countryCode: "",
        population: null,
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: initialValues,
    });

    const handleForm = (formData: CountryFormInputs) =>
        createCountryMutation.mutate(formData);
    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold">
                    Crear Pais
                </h1>
                <p className="text-2xl font-light text-gray-500 mt-5">
                    Llena el siguiente formulario para  un país
                </p>
                <nav className="my-5">
                    <Link
                        to="/dashboard/energy-management/countries"
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
                    <CountryForm register={register} errors={errors} />
                    <input
                        type="submit"
                        value="Crear País"
                        className="bg-green-600 hover:bg-green-700  w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-md "
                    />
                </form>
            </div>
        </>
    );
};
