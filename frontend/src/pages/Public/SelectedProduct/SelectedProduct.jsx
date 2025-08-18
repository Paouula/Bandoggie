import React, { useState } from "react";
import { ChevronRight, Star, ChevronLeft, ChevronRight as ChevronRightIcon } from "lucide-react";
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

  if (loading) return <p>Cargando producto...</p>;
  if (!product) return <p>No se encontró el producto</p>;

  // Unimos todas las imágenes en un solo array
  const allImages = [
    product.image,
    ...(product.gallery || []),
    ...(product.designImages || []),
  ];

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? "star-filled" : "star-empty"}
      />
    ));

  // Navegación imágenes
  const prevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };
  const nextImage = () => {
    setSelectedImage((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

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
          <div className="main-image-wrapper">
            <button className="nav-arrow left" onClick={prevImage} aria-label="Imagen anterior">
              <ChevronLeft size={30} />
            </button>

            <img
              src={allImages[selectedImage] || "/api/placeholder/400/400"}
              alt={`${product.nameProduct} imagen ${selectedImage + 1}`}
              className="main-image"
            />

            <button className="nav-arrow right" onClick={nextImage} aria-label="Imagen siguiente">
              <ChevronRightIcon size={30} />
            </button>
          </div>

          {/* Miniaturas */}
          <div className="thumbnail-row">
            {allImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`thumbnail ${
                  selectedImage === index ? "thumbnail-active" : ""
                }`}
                aria-label={`Ver imagen ${index + 1}`}
              >
                <img src={img} alt={`Miniatura ${index + 1}`} />
              </button>
            ))}
          </div>
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
          <p className="description-review">{product.description}</p>

          {/* Tallas */}
          <div className="section">
            <h4>Talla</h4>
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
            <div className="top-action-row">
              <select
                className="quantity-reviews"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                  <option key={num}>{num}</option>
                ))}
              </select>
              <button className="btn add-to-cart">Añadir al carrito</button>
            </div>
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
