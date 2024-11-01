import { Content } from "../../interfaces/renewable-energy-response.interface";

type Props = {
    renewableEnergies: Content;
    index: number;
};

export const ListItemRenewableEnergies = ({
    renewableEnergies,
    index,
}: Props) => {
    const {
        energyType: { energyName },
        country: { countryName },
        year,
        production,
        consumption,
    } = renewableEnergies;
    return (
        <tr className="border-b">
            <td className="p-4 text-left">
                <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                        <p className="text-lg font-normal text-blue-gray-900">
                            {index}
                        </p>
                        <p className="text-sm font-normal text-blue-gray-900 opacity-70"></p>
                    </div>
                </div>
            </td>
            <td className="p-4 text-left">
                <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                        <p className="text-lg font-normal text-blue-gray-900">
                            {energyName}
                        </p>
                        <p className="text-sm font-normal text-blue-gray-900 opacity-70"></p>
                    </div>
                </div>
            </td>
            <td className="p-4 text-left">
                <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                        <p className="text-lg font-normal text-blue-gray-900">
                            {countryName}
                        </p>
                        <p className="text-sm font-normal text-blue-gray-900 opacity-70"></p>
                    </div>
                </div>
            </td>
            <td className="p-4 text-left">
                <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                        <p className="text-lg font-normal text-blue-gray-900">
                            {year}
                        </p>
                        <p className="text-sm font-normal text-blue-gray-900 opacity-70"></p>
                    </div>
                </div>
            </td>
            <td className="p-4 text-left">
                <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                        <p className="text-lg font-normal text-blue-gray-900">
                            {production}
                        </p>
                        <p className="text-sm font-normal text-blue-gray-900 opacity-70"></p>
                    </div>
                </div>
            </td>
            <td className="p-4 text-left">
                <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                        <p className="text-lg font-normal text-blue-gray-900">
                            {consumption}
                        </p>
                        <p className="text-sm font-normal text-blue-gray-900 opacity-70"></p>
                    </div>
                </div>
            </td>
        </tr>
    );
};
