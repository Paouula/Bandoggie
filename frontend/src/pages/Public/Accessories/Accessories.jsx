import React, { useState, useMemo } from "react";
import ListAccessories from "../../../components/Public/ProductAccesories/ListAccessories.jsx";
import useDataAccessories from "../../../components/Public/ProductAccesories/hooks/useDataAccessories.jsx";
import PaginationAndFilter from "../../../components/PaginationAndFilter/PaginationAndFilter.jsx";

const Accessories = () => {
  const { Accessories, loading, error } = useDataAccessories();

  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Ordenar por precio
  const sortedAccessories = useMemo(() => {
    if (!Array.isArray(Accessories)) return [];

    return [...Accessories].sort((a, b) => {
      const precioA = parseFloat(String(a.precio ?? a.price ?? "0").replace(/[^0-9.]/g, "")) || 0;
      const precioB = parseFloat(String(b.precio ?? b.price ?? "0").replace(/[^0-9.]/g, "")) || 0;

      return sortOrder === "asc" ? precioA - precioB : precioB - precioA;
    });
  }, [Accessories, sortOrder]);

  // Paginación
  const totalPages = Math.ceil(sortedAccessories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAccessories = sortedAccessories.slice(startIndex, startIndex + itemsPerPage);

  if (loading) return <p className="text-center mt-6 text-gray-600">Cargando accesorios...</p>;
  if (error) return <p className="text-center mt-6 text-red-600">Error: {error}</p>;

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Encabezado y filtro */}
      <div className="flex justify-between items-center mt-6 mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Accesorios</h2>

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

      {/* Lista paginada */}
      <ListAccessories key={sortOrder} Accessories={paginatedAccessories} />

      {/* Paginación */}
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

export default Accessories;