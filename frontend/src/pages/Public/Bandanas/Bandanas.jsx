import React, { useState, useMemo } from "react";
import ListBandanas from "../../../components/Public/ProductBandanas/ListBandanas.jsx";
import useDataBandanas from "../../../components/Public/ProductBandanas/hooks/useDataBandanas.jsx";
import PaginationAndFilter from "../../../components/PaginationAndFilter/PaginationAndFilter.jsx";

const Bandanas = () => {
  const { Bandanas, loading, error } = useDataBandanas();

  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const sortedBandanas = useMemo(() => {
    if (!Array.isArray(Bandanas)) return [];

    return [...Bandanas].sort((a, b) => {
      const precioA = parseFloat(String(a.precio ?? a.price ?? "0").replace(/[^0-9.]/g, "")) || 0;
      const precioB = parseFloat(String(b.precio ?? b.price ?? "0").replace(/[^0-9.]/g, "")) || 0;

      return sortOrder === "asc" ? precioA - precioB : precioB - precioA;
    });
  }, [Bandanas, sortOrder]);

  const totalPages = Math.ceil(sortedBandanas.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBandanas = sortedBandanas.slice(startIndex, startIndex + itemsPerPage);

  if (loading) return <p className="text-center mt-6 text-gray-600">Cargando bandanas...</p>;
  if (error) return <p className="text-center mt-6 text-red-600">Error: {error}</p>;

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="flex justify-between items-center mt-6 mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Bandanas</h2>
        <select
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-300 bg-white text-gray-700 rounded-lg px-3 py-2 shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        >
          <option value="asc">Precio: menor a mayor</option>
          <option value="desc">Precio: mayor a menor</option>
        </select>
      </div>

      <ListBandanas key={sortOrder} Bandanas={paginatedBandanas} />

      <div className="mt-8">
        <PaginationAndFilter
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        /> <br />
      </div>
    </div>
  );
};

export default Bandanas;