import React, { useState } from "react";
import ListBandanas from "../../../components/Public/ProductBandanas/ListBandanas.jsx";
import useDataBandanas from "../../../components/Public/ProductBandanas/hooks/useDataBandanas.jsx";
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen.jsx";

const Bandanas = () => {

 const { Bandanas, loading, error } = useDataBandanas();

  if (loading) return <LoadingScreen message="Cargando bandanas..." />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="christmas-store">

        <ListBandanas Bandanas={Bandanas} />
      </div>
  );
};

export default Bandanas;