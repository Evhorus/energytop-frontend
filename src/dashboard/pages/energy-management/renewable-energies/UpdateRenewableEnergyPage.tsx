import { Link, Navigate, useParams } from "react-router-dom";
import { useAppStore } from "../../../../shared";
import { useRenewableEnergies } from "../../../hooks/renewable-energy/useRenewableEnergies";
import { useRenewableEnergyMutation } from "../../../hooks/renewable-energy/useRenewableEnergyMutation";
import { RenewableEnergyFormInputs } from "../../../interfaces/renewable-energies/renewable-energy.interface";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { RenewableEnergyForm } from "../../../components/RenewableEnergy/RenewableEnergyForm";

export const UpdateRenewableEnergyPage = () => {
    const userClaimsJwt = useAppStore((state) => state.claims);
    const params = useParams();
    const idRenewableEnergy = +params.id!;
    const { renewableEnergy } = useRenewableEnergies({ idRenewableEnergy });

    console.log(renewableEnergy.data)
    const { updateRenewableEnergyMutation } = useRenewableEnergyMutation({
        redirect: "/dashboard/energy-management/renewable-energy",
        idRenewableEnergy: renewableEnergy.data?.id,
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<RenewableEnergyFormInputs>({
        defaultValues: {
            energyType: null,
            country: null,
            consumption: null,
            production: null,
            year: new Date().getFullYear(),
        },
    });
    
    useEffect(() => {
        if (renewableEnergy.data) {
            reset({
                energyType: renewableEnergy.data.energyType.id,
                country: renewableEnergy.data.country.id,
                consumption: renewableEnergy.data.consumption,
                production: renewableEnergy.data.production,
                year: renewableEnergy.data.year,
            });
        }
    }, [renewableEnergy.data, reset,]);
    
    const handleForm = (formData: RenewableEnergyFormInputs) => {
        const formWithId = {
            idRenewableEnergy,
            formData,
        };
        updateRenewableEnergyMutation.mutate(formWithId);
    };

    if (renewableEnergy.isLoading) return <p>Loading...</p>;
    if (!userClaimsJwt?.isAdmin) return <Navigate to="/dashboard/home" />;
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
