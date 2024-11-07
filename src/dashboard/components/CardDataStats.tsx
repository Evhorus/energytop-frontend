import React, { ReactNode } from "react";

interface CardDataStatsProps {
    title: string;
    total: string | number;
    children: ReactNode;
}

export const CardDataStats: React.FC<CardDataStatsProps> = ({ title, total, children }) => {
    return (
        <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-lg dark:border-strokedark dark:bg-boxdark hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-400 transition-all transform hover:scale-105">
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                {children}
            </div>

            <div className="mt-4 flex items-end justify-between">
                <div>
                    <h4 className="text-title-md font-bold text-black dark:text-white">
                        {total}
                    </h4>
                    <span className="text-sm font-medium">{title}</span>
                </div>
            </div>
        </div>
    );
};
