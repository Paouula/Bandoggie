import React, { useState } from "react";
import ProductFilters from "../../../components/Filter.jsx";
import ListAccessories from "../../../components/Public/ProductAccesories/ListAccessories.jsx";
import useDataAccessories from "../../../components/Public/ProductAccesories/hooks/useDataAccessories.jsx";

const Accessories = () => {
  const [selectedFilter, setSelectedFilter] = useState();
  const [showFilters, setShowFilters] = useState(false);

 const { Accessories, loading, error } = useDataAccessories();

  if (loading) return <p>Cargando accesorios...</p>;
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
        
        <ListAccessories Accessories={Accessories} />
      </div>
    </div>
  );
};

export default Accessories;