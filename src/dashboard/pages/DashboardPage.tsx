import {
    useCountries,
    useEnergyTypes,
    useRenewableEnergies,
    useUser,
} from "..";
import { CardDataStats } from "../components/CardDataStats";
import { IoMdGlobe } from "react-icons/io";
import { FaBolt } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
// import { TopCountryEnergy } from "../components/TopChannels";
import { Link } from "react-router-dom";
export const DashboardPage = () => {
    const { users } = useUser();
    const { energyTypes } = useEnergyTypes({ currentPage: 0, pageSize: 100 });
    const { renewableEnergies } = useRenewableEnergies({
        currentPage: 0,
        pageSize: 100,
        listEnergies: true,
    });
    const { countries } = useCountries({ currentPage: 0, pageSize: 500 });
    return (
        <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 pb-5">
                <Link to="/dashboard/energy-management/energy-types">
                    <CardDataStats
                        title="Total Tipo de Energias Renovables"
                        total={energyTypes.data?.content.length!}
                    >
                        <FaBolt size={25} />
                    </CardDataStats>
                </Link>

                <Link to="/dashboard/energy-management/renewable-energies">
                    <CardDataStats
                        title="Total registros de energias renovables"
                        total={renewableEnergies.data?.content.length!}
                    >
                        <FaDatabase size={25} />
                    </CardDataStats>
                </Link>
                <Link to="/dashboard/energy-management/countries">
                    <CardDataStats
                        title="Total de paises"
                        total={countries.data?.content.length!}
                    >
                        <IoMdGlobe size={25} />
                    </CardDataStats>
                </Link>
                <Link to="/dashboard/users">
                    <CardDataStats
                        title="Total Usuarios"
                        total={users.data?.length!}
                    >
                        <FaUsers size={25} />
                    </CardDataStats>
                </Link>
            </div>
            {/* <div className="col-span-12 xl:col-span-6">
                <TopCountryEnergy />
            </div> */}
        </>
    );
};
