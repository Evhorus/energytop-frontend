import { Link } from "react-router-dom";

export const DashboardPage = () => {
    
    return (
        <Link to="/dashboard/users" className="bg-stone-400 px-4 py-2 text-xl">users</Link>
    );
};

/* barra de navecacion */
{
    /* <div className="flex items-center justify-between p-4 border-t border-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    Page 1 of 10
                </p>
                <div className="flex gap-2">
                    <button
                        className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                    >
                        Previous
                    </button>
                    <button
                        className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                    >
                        Next
                    </button>
                </div>
            </div> */
}
// </div>
