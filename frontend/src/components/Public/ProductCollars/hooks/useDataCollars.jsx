import { useState, useEffect } from "react";

const useDataCollars = () => {
  const [Collars, setCollars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCollars = async () => {
    try {
      
      const categoryId = "68a1476c6b65e3a7962662a5";  

      const response = await fetch(`http://localhost:4000/api/products/category/${categoryId}`);
      if (!response.ok) throw new Error(`Error ${response.status}`);
      
      const data = await response.json();
      console.log("Productos de categoría Collars:", data);

      setCollars(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching collars:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollars();
  }, []);

  return { Collars, loading, error };
};

export default useDataCollars;
