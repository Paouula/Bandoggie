import React, { useState } from "react";
import { ChevronRight, Star } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import useProductData from "../../../components/Public/SelectedProduct/hooks/useProductData.jsx";
import Reviews from "../../../components/Public/SelectedProduct/Reviews.jsx";
import RelatedProducts from "../../../components/Public/SelectedProduct/RelatedProduct.jsx";
import "./SelectedProduct.css";

const SelectedProduct = () => {
  const { id } = useParams();
  const { product, relatedProducts, reviews, loading } = useProductData(id);

  const [selectedSize, setSelectedSize] = useState("S");
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);

  const sizes = ["XS", "S", "M", "L", "XL"];

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? "star-filled" : "star-empty"}
      />
    ));

  if (loading) return <p>Cargando producto...</p>;
  if (!product) return <p>No se encontró el producto</p>;

  return (
    <div className="product-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">Inicio</Link>
        <ChevronRight size={16} />
        <Link to={`/category/${product.idCategory?._id}`}>
          {product.idCategory?.name}
        </Link>
        <ChevronRight size={16} />
        <span className="breadcrumb-active">{product.nameProduct}</span>
      </div>

      <div className="product-container">
        {/* Imágenes */}
        <div className="product-images">
          <div className="main-image">
            <img
              src={product.image || "/api/placeholder/400/400"}
              alt={product.nameProduct}
            />
          </div>
          {product.gallery && product.gallery.length > 0 && (
            <div className="thumbnail-row">
              {product.gallery.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`thumbnail ${
                    selectedImage === index ? "thumbnail-active" : ""
                  }`}
                >
                  <img src={img} alt={`Vista ${index + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info producto */}
        <div className="product-info">
          <h1>{product.nameProduct}</h1>
          <p className="price">Desde ${product.price}</p>
          <div className="rating">
            <span>5.0</span>
            <div className="stars">{renderStars(5)}</div>
            <span>({reviews.length} evaluaciones)</span>
          </div>
          <p className="description">{product.description}</p>

          {/* Tallas */}
          <div className="section">
            <h3>Talla</h3>
            <div className="sizes">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`size ${
                    selectedSize === size ? "size-active" : ""
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Nombre mascota */}
          <div className="section">
            <label>Nombre </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Nombre de tu mascota"
            />
          </div>

          {/* Acciones */}
          <div className="actions">
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                <option key={num}>{num}</option>
              ))}
            </select>
            <button className="btn add-to-cart">Añadir al carrito</button>
            <button className="btn buy-now">Comprar ahora</button>
          </div>
        </div>
      </div>

      {/* Reseñas */}
      <Reviews reviews={reviews} />

      {/* Relacionados */}
      <RelatedProducts products={relatedProducts} />
    </div>
  );
};

export default SelectedProduct;
