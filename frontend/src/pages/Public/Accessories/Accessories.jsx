import React, { useState } from "react";
import ListAccessories from "../../../components/Public/ProductAccesories/ListAccessories.jsx";
import useDataAccessories from "../../../components/Public/ProductAccesories/hooks/useDataAccessories.jsx";
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen.jsx";
import { Toaster } from 'react-hot-toast';


const Accessories = () => {

 const { Accessories, loading, error } = useDataAccessories();

  if (loading) return <LoadingScreen message="Cargando accesorios..." />;
  if (error) return <p>Error: {error}</p>;

  return (
    
   <>
         <Toaster position="top-right" />
    <div className="christmas-store">
      
        
        <ListAccessories Accessories={Accessories} />
      </div>
   </>

  );
};

export default Accessories;