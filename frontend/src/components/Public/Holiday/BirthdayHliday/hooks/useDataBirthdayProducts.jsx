import { useState, useEffect } from "react";

const useDataBirthdayProducts = () => {
  const [BirthdayProducts, setBirthdayProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBirthdayProducts = async () => {
    try {
      const holidayId = "68a4ce2aa2099a968645d55f";  
      const response = await fetch(`http://localhost:4000/api/products/holiday/${holidayId}`);
      
      if (!response.ok) throw new Error(`Error ${response.status}`);
      
      const data = await response.json();
      console.log("Respuesta de la API:", data); // Agrega este log para ver la respuesta

      // Asegúrate de que la estructura de data sea la esperada
      if (Array.isArray(data)) {
        setBirthdayProducts(data);
      } else {
        console.error("La respuesta no es un array:", data);
        setBirthdayProducts([]);
      }
    } catch (err) {
      console.error("Error fetching productos:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBirthdayProducts();
  }, []);

  return { BirthdayProducts, loading, error };
};

export default useDataBirthdayProducts;
