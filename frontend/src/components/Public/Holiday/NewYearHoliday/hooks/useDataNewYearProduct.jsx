import { useState, useEffect } from "react";

const useDataNewYearProducts = () => {
  const [NewYearProducts, setNewYearProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNewYearProducts = async () => {
    try {
      const holidayId = "68a4c746a2099a968645d546";  
      const response = await fetch(`http://localhost:4000/api/products/holiday/${holidayId}`);
      
      if (!response.ok) throw new Error(`Error ${response.status}`);
      
      const data = await response.json();
      console.log("Respuesta de la API:", data); // Agrega este log para ver la respuesta

      // Asegúrate de que la estructura de data sea la esperada
      if (Array.isArray(data)) {
        setNewYearProducts(data);
      } else {
        console.error("La respuesta no es un array:", data);
        setNewYearProducts([]);
      }
    } catch (err) {
      console.error("Error fetching productos:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewYearProducts();
  }, []);

  return { NewYearProducts, loading, error };
};

export default useDataNewYearProducts;
