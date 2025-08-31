import { useState, useEffect } from "react";

const useDataHalloweenProducts = () => {
  const [HalloweenProducts, setHalloweenProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHalloweenProducts = async () => {
    try {
      const holidayId = "689555222515953c7bbe9f8f";  
      const response = await fetch(`http://localhost:4000/api/products/holiday/${holidayId}`);
      
      if (!response.ok) throw new Error(`Error ${response.status}`);
      
      const data = await response.json();
      console.log("Respuesta de la API:", data); // Agrega este log para ver la respuesta

      // Asegúrate de que la estructura de data sea la esperada
      if (Array.isArray(data)) {
        setHalloweenProducts(data);
      } else {
        console.error("La respuesta no es un array:", data);
        setHalloweenProducts([]);
      }
    } catch (err) {
      console.error("Error fetching productos:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHalloweenProducts();
  }, []);

  return { HalloweenProducts, loading, error };
};

export default useDataHalloweenProducts;
