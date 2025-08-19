import { useState, useEffect } from "react";

const useDataChristmasProducts = () => {
  const [ChristmasProducts, setChristmasProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchChristmasProducts = async () => {
    try {
      
      const holidayId = "68a1475a6b65e3a7962662a1";  

      const response = await fetch(`http://localhost:4000/api/products/holidayId/${holidayId}`);
      if (!response.ok) throw new Error(`Error ${response.status}`);
      
      const data = await response.json();
      console.log("Productos de categoría Bandanas:", data);

      setChristmasProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching bandanas:", err);
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
