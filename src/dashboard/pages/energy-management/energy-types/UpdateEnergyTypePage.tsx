import { Link, Navigate, useParams } from "react-router-dom";
import { useAppStore } from "../../../../shared";
import { useEnergyTypes } from "../../../hooks/energy-types/useEnergyTypes";
import { useEnergyTypesMutation } from "../../../hooks/energy-types/useEnergyTypesMutation";
import { useForm } from "react-hook-form";
import { EnergyTypeFormInputs } from "../../../interfaces/energy-types/energy-type.interface";
import { useEffect } from "react";
import { EnergyTypeForm } from "../../../components/EnergyTypes/EnergyTypeForm";

export const UpdateEnergyTypePage = () => {
    const userClaimsJwt = useAppStore((state) => state.claims);
    const params = useParams();
    const idEnergyType = +params.id!;
    const { energyType } = useEnergyTypes({ idEnergyType });
    const { updateEnergyTypeMutation } = useEnergyTypesMutation({
        redirect: "/dashboard/energy-management/energy-types",
        idEnergyType: energyType.data?.id,
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<EnergyTypeFormInputs>({
        defaultValues: {
            energyName: "",
            source: "",
        },
    });

    useEffect(() => {
        if (energyType.data) {
            reset({
                energyName: energyType.data.energyName,
                source: energyType.data.source,
            });
        }
    }, [energyType.data, reset]);

    const handleForm = (formData: EnergyTypeFormInputs) => {
        const formWithId = {
            idEnergyType,
            formData,
        };
        updateEnergyTypeMutation.mutate(formWithId);
    };

    if (energyType.isLoading) return <p>Loading...</p>;
    if (!userClaimsJwt?.isAdmin) return <Navigate to="/dashboard/home" />;
    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold">Actualizar Tipo de energía</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">
                    Modifica el siguiente formulario para actualizar el tipo de energía
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
                    <div className="p-6.5">
                        <EnergyTypeForm register={register} errors={errors} />
                        <input
                            type="submit"
                            value="Actualizar Tipo de energía"
                            className="bg-green-600 hover:bg-green-700  w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-md "
                        />
                    </div>
                </form>
            </div>
        </>
    );
};
