import React, { useState } from "react";
import ListAccessories from "../../../components/Public/ProductAccesories/ListAccessories.jsx";
import useDataAccessories from "../../../components/Public/ProductAccesories/hooks/useDataAccessories.jsx";

const Accessories = () => {

 const { Accessories, loading, error } = useDataAccessories();

  if (loading) return <p>Cargando accesorios...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="christmas-store">
      
        
        <ListAccessories Accessories={Accessories} />
      </div>

  );
};

export default Accessories;