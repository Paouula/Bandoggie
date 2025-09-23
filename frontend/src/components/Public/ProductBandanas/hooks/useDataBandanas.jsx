import { useState, useEffect } from "react";

const useDataBandanas = () => {
  const [Bandanas, setBandanas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBandanas = async () => {
    try {
      
      const categoryId = "68a1475a6b65e3a7962662a1";  

      const response = await fetch(`https://bandoggie-production.up.railway.app/api/products/category/${categoryId}`);
      if (!response.ok) throw new Error(`Error ${response.status}`);
      
      const data = await response.json();
      console.log("Productos de categoría Bandanas:", data);

      setBandanas(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching bandanas:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBandanas();
  }, []);

  return { Bandanas, loading, error };
};

export default useDataBandanas;
