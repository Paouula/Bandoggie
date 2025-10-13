import React from "react";

const PaginationAndFilter = ({ currentPage, setCurrentPage, totalPages }) => {
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg transition ${
          currentPage === 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        ← Anterior
      </button>

      <span className="text-gray-700 font-medium">
        Página <span className="text-blue-600">{currentPage}</span> de {totalPages}
      </span>

      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg transition ${
          currentPage === totalPages
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        Siguiente →
      </button>
    </div>
  );
};

export default PaginationAndFilter;