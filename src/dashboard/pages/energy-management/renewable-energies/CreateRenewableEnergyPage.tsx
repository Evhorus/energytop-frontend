import { useForm } from "react-hook-form";
import { useRenewableEnergyMutation } from "../../../hooks/renewable-energy/useRenewableEnergyMutation";
import { RenewableEnergyFormInputs } from "../../../interfaces/renewable-energies/renewable-energy.interface";
import { Link } from "react-router-dom";
import { RenewableEnergyForm } from "../../../components/RenewableEnergy/RenewableEnergyForm";

export const CreateRenewableEnergyPage = () => {
    const { createRenewableEnergyMutation } = useRenewableEnergyMutation({
        redirect: "/dashboard/energy-management/renewable-energy",
    });
    const initialValues: RenewableEnergyFormInputs = {
        energyType: null,
        country: null,
        consumption: null,
        production: null,
        year: new Date().getFullYear(),
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: initialValues,
    });

    const handleForm = (data: RenewableEnergyFormInputs) => {
        const { energyType, country, ...rest } = data;

        const formData = {
            ...rest,
            energyType: energyType,
            country: country,
        };
        createRenewableEnergyMutation.mutate(formData);
    };

    
    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold">Crear Energia renovable</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">
                    Llena el siguiente formulario para crear una energia
                    renovable
                </p>
                <nav className="my-5">
                    <Link
                        to="/dashboard/energy-management/renewable-energies"
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
                    <RenewableEnergyForm register={register} errors={errors} />
                    <input
                        type="submit"
                        value="Crear energia renovable"
                        className="bg-green-600 hover:bg-green-700  w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-md "
                    />
                </form>
            </div>
        </>
    );
};
