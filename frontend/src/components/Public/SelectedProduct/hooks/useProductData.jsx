import { useEffect, useState } from "react";
import { API_FETCH_JSON } from "../../../../config.js"; 

const useProductData = (id) => {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Producto
        const data = await API_FETCH_JSON(`products/${id}`);
        setProduct(data);

        // Relacionados
        if (data?.idCategory?._id) {
          const related = await API_FETCH_JSON(
            `products/category/${data.idCategory._id}`
          );
          setRelatedProducts(related.filter((p) => p._id !== data._id));
        }

        // Reviews reales del backend
        const reviewsData = await API_FETCH_JSON(`reviews/product/${id}`);
        setReviews(reviewsData);

      } catch (err) {
        console.error("Error cargando datos:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  return { product, relatedProducts, reviews, loading };
};

export default useProductData;
