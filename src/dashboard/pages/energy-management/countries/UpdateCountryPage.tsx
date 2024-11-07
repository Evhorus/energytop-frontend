import { Link, Navigate, useParams } from "react-router-dom";
import { Loader, useAppStore } from "../../../../shared";
import { useCountries } from "../../../hooks/countries/useCountries";
import { useCountriesMutation } from "../../../hooks/countries/useCountriesMutation";
import { CountryFormInputs } from "../../../interfaces/countries/countries.interface";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { CountryForm } from "../../../components/Countries/CountryForm";

export const UpdateCountryPage = () => {
    const userClaimsJwt = useAppStore((state) => state.claims);
    const params = useParams();
    const idCountry = +params.id!;
    const { country } = useCountries({ idCountry });
    const { updateCountryMutation } = useCountriesMutation({
        redirect: "/dashboard/energy-management/countries",
        idCountry: country.data?.id,
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CountryFormInputs>({
        defaultValues: {
            countryName: "",
            countryCode: "",
            population: null,
        },
    });

    useEffect(() => {
        if (country.data) {
            reset({
                countryName: country.data.countryName,
                countryCode: country.data.countryCode,
                population: country.data.population,
            });
        }
    }, [country.data, reset]);

    const handleForm = (formData: CountryFormInputs) => {
        const formWithId = {
            idCountry,
            formData,
        };
        updateCountryMutation.mutate(formWithId);
    };

    if (country.isLoading) return <Loader />;
    if (!userClaimsJwt?.isAdmin) return <Navigate to="/dashboard/home" />;
    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold">Actualizar País</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">
                    Modifica el siguiente formulario para actualizar el país
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
                    <div className="p-6.5">
                        <CountryForm register={register} errors={errors} />
                        <input
                            type="submit"
                            value="Actualizar País"
                            className="bg-green-600 hover:bg-green-700  w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-md "
                        />
                    </div>
                </form>
            </div>
        </>
    );
};
