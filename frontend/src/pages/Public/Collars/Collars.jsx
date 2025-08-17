import React, { useState } from "react";
import ProductFilters from "../../../components/Filter.jsx";
import ListCollars from "../../../components/Public/ProductCollars/ListCollars.jsx";
import useDataCollars from "../../../components/Public/ProductCollars/hooks/useDataCollars.jsx";

const Collars = () => {
  const [selectedFilter, setSelectedFilter] = useState();
  const [showFilters, setShowFilters] = useState(false);

 const { Collars, loading, error } = useDataCollars();

  if (loading) return <p>Cargando collares...</p>;
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
        
        <ListCollars Collars={Collars} />
      </div>
    </div>
  );
};

export default Collars;