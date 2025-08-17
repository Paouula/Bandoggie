import React, { useState } from "react";
import ProductFilters from "../../../components/Filter.jsx";
import ListBandanas from "../../../components/Public/ProductBandanas/ListBandanas.jsx";
import useDataBandanas from "../../../components/Public/ProductBandanas/hooks/useDataBandanas.jsx";

const Bandanas = () => {
  const [selectedFilter, setSelectedFilter] = useState();
  const [showFilters, setShowFilters] = useState(false);

 const { Bandanas, loading, error } = useDataBandanas();

  if (loading) return <p>Cargando bandanas...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="christmas-store">
      <div className="main-content">
        <ProductFilters
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        />

        <ListBandanas Bandanas={Bandanas} />
      </div>
    </div>
  );
};

export default Bandanas;
