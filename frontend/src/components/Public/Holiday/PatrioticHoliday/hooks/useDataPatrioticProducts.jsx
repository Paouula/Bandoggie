import { useState, useEffect } from "react";

const useDataPatrioticProducts = () => {
  const [PatrioticProducts, setPatrioticProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPatrioticProducts = async () => {
    try {
      const holidayId = "68a4c746a2099a968645d546";  
      const response = await fetch(`https://bandoggie-production.up.railway.app/api/products/holiday/${holidayId}`);
      
      if (!response.ok) throw new Error(`Error ${response.status}`);
      
      const data = await response.json();
      console.log("Respuesta de la API:", data); // Agrega este log para ver la respuesta

      // Asegúrate de que la estructura de data sea la esperada
      if (Array.isArray(data)) {
        setPatrioticProducts(data);
      } else {
        console.error("La respuesta no es un array:", data);
        setPatrioticProducts([]);
      }
    } catch (err) {
      console.error("Error fetching productos:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatrioticProducts();
  }, []);

  return { PatrioticProducts, loading, error };
};

export default useDataPatrioticProducts;
