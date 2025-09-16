import { useState, useEffect } from "react";

const useDataChristmasProducts = () => {
  const [ChristmasProducts, setChristmasProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchChristmasProducts = async () => {
    try {
      const holidayId = "687054b2eb1f61053860409a";  
      const response = await fetch(`https://bandoggie.onrender.com/api/products/holiday/${holidayId}`);
      
      if (!response.ok) throw new Error(`Error ${response.status}`);
      
      const data = await response.json();
      console.log("Respuesta de la API:", data); // Agrega este log para ver la respuesta

      // Asegúrate de que la estructura de data sea la esperada
      if (Array.isArray(data)) {
        setChristmasProducts(data);
      } else {
        console.error("La respuesta no es un array:", data);
        setChristmasProducts([]);
      }
    } catch (err) {
      console.error("Error fetching productos:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChristmasProducts();
  }, []);

  return { ChristmasProducts, loading, error };
};

export default useDataChristmasProducts;
