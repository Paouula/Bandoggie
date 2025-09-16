import React, { useState } from "react";
import ListBandanas from "../../../components/Public/ProductBandanas/ListBandanas.jsx";
import useDataBandanas from "../../../components/Public/ProductBandanas/hooks/useDataBandanas.jsx";

const Bandanas = () => {

 const { Bandanas, loading, error } = useDataBandanas();

  if (loading) return <p>Cargando bandanas...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="christmas-store">

        <ListBandanas Bandanas={Bandanas} />
      </div>
  );
};

export default Bandanas;
