// hooks/useDataCarts.jsx
import { useState, useEffect } from "react";

const useDataCarts = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const fetchCarts = async () => {
  try {
    const response = await fetch("http://localhost:4000/api/cart");
    if (!response.ok) throw new Error(`Error ${response.status}`);
    const data = await response.json();

    console.log("Respuesta del backend /api/cart:", data);

    // Forzamos a que siempre sea array
    if (Array.isArray(data)) {
      setCarts(data);
    } else if (Array.isArray(data.carts)) {
      setCarts(data.carts);
    } else {
      setCarts([]); // fallback
    }

  } catch (err) {
    console.error("Error fetching carts:", err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

console.log("Carts recibido en ListOrders:", carts, Array.isArray(carts));



  useEffect(() => {
    fetchCarts();
  }, []);

  return { carts, loading, error };
};

export default useDataCarts;
