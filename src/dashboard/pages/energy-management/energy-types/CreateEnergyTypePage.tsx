import { useForm } from "react-hook-form";
import { useEnergyTypesMutation } from "../../../hooks/energy-types/useEnergyTypesMutation";
import { EnergyTypeFormInputs } from "../../../interfaces/energy-types/energy-type.interface";
import { Link, Navigate } from "react-router-dom";
import { EnergyTypeForm } from "../../../components/EnergyTypes/EnergyTypeForm";
import { useAppStore } from "../../../../shared";

export const CreateEnergyTypePage = () => {
    const userClaimsJwt = useAppStore((state) => state.claims);
    const { createEnergyTypeMutation } = useEnergyTypesMutation({
        redirect: "/dashboard/energy-management/energy-types",
    });
    const initialValues: EnergyTypeFormInputs = {
        energyName: "",
        source: "",
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: initialValues,
    });

    const handleForm = (formData: EnergyTypeFormInputs) =>
        createEnergyTypeMutation.mutate(formData);


    if (!userClaimsJwt?.isAdmin) return <Navigate to="/dashboard/home" />;
    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold">
                    Crear Tipo de energía renovable
                </h1>
                <p className="text-2xl font-light text-gray-500 mt-5">
                    Llena el siguiente formulario para crear un tipo de energía
                    renoable
                </p>
                <nav className="my-5">
                    <Link
                        to="/dashboard/energy-management/energy-types"
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
                    <EnergyTypeForm register={register} errors={errors} />
                    <input
                        type="submit"
                        value="Crear Tipo de energía"
                        className="bg-green-600 hover:bg-green-700  w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-md "
                    />
                </form>
            </div>
        </>
    );
};
