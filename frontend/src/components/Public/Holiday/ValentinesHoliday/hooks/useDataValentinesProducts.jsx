import { useState, useEffect } from "react";

const useDataValentinesProducts = () => {
  const [ValentinesProducts, setValentinesProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchValentinesProducts = async () => {
    try {
      const holidayId = "68a4b29c8ae388e19910c1fa";  
      const response = await fetch(`http://localhost:4000/api/products/holiday/${holidayId}`);
      
      if (!response.ok) throw new Error(`Error ${response.status}`);
      
      const data = await response.json();
      console.log("Respuesta de la API:", data); // Agrega este log para ver la respuesta

      // Asegúrate de que la estructura de data sea la esperada
      if (Array.isArray(data)) {
        setValentinesProducts(data);
      } else {
        console.error("La respuesta no es un array:", data);
        setValentinesProducts([]);
      }
    } catch (err) {
      console.error("Error fetching productos:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchValentinesProducts();
  }, []);

  return { ValentinesProducts, loading, error };
};

export default useDataValentinesProducts;
