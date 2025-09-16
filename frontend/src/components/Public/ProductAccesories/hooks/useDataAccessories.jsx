import { useState, useEffect } from "react";

const useDataAccessories = () => {
  const [Accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAccessories = async () => {
    try {
      
      const categoryId = "68a1476c6b65e3a7962662a5";  

      const response = await fetch(`https://bandoggie.onrender.com/api/products/category/${categoryId}`);
      if (!response.ok) throw new Error(`Error ${response.status}`);
      
      const data = await response.json();
      console.log("Productos de categoría Accesorios:", data);

      setAccessories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching accesorios:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccessories();
  }, []);

  return { Accessories, loading, error };
};

export default useDataAccessories;
