import React, { useState } from "react";
import ListCollars from "../../../components/Public/ProductCollars/ListCollars.jsx";
import useDataCollars from "../../../components/Public/ProductCollars/hooks/useDataCollars.jsx";
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen.jsx";

const Collars = () => {

 const { Collars, loading, error } = useDataCollars();

  if (loading) return <LoadingScreen message="Cargando collares..." />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="christmas-store">
        
        <ListCollars Collars={Collars} />
      </div>
  );
};

export default Collars;