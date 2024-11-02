interface Props {
    currentPage: number;
    totalPages: number;
    handleNextPage: () => void;
    handlePreviousPage: () => void;
}

export const PaginationControls = ({
    currentPage,
    totalPages,
    handleNextPage,
    handlePreviousPage,
}: Props) => {
    return (
        <div className="flex justify-center items-center p-4 gap-5">
            <button
                onClick={handlePreviousPage}
                disabled={currentPage === 0}
                className={`px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 transition duration-200 ${
                    currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                Página Anterior
            </button>
            <p className="text-gray-700">
                Página {currentPage + 1} de {totalPages}
            </p>
            <button
                onClick={handleNextPage}
                disabled={currentPage >= totalPages - 1}
                className={`px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 transition duration-200 ${
                    currentPage >= totalPages - 1
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                }`}
            >
                Siguiente Página
            </button>
        </div>
    );
};
