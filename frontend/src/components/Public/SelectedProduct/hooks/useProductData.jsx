import { useEffect, useState } from "react";

const useProductData = (id) => {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Producto
        const res = await fetch(`http://localhost:4000/api/products/${id}`);
        const data = await res.json();
        setProduct(data);

        // Relacionados
        if (data?.idCategory?._id) {
          const resRelated = await fetch(
            `http://localhost:4000/api/products/category/${data.idCategory._id}`
          );
          const related = await resRelated.json();
          setRelatedProducts(related.filter((p) => p._id !== data._id));
        }

        // Reviews reales del backend
        const resReviews = await fetch(
          `http://localhost:4000/api/reviews/product/${id}`
        );
        const reviewsData = await resReviews.json();
        setReviews(reviewsData);
      } catch (err) {
        console.error("Error cargando datos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return { product, relatedProducts, reviews, loading };
};

export default useProductData;
