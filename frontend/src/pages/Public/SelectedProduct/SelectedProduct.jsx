import React, { useState } from "react";
import { ChevronRight, Star, ChevronLeft, ChevronRight as ChevronRightIcon, X } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import useProductData from "../../../components/Public/SelectedProduct/hooks/useProductData.jsx";
import Reviews from "../../../components/Public/SelectedProduct/Reviews.jsx";
import RelatedProducts from "../../../components/Public/SelectedProduct/RelatedProduct.jsx";
import { useAuth } from "../../../Context/AuthContext.jsx"; 
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";
import "./SelectedProduct.css";

const SelectedProduct = () => {
  const { id } = useParams();
  const { product, relatedProducts, reviews, loading } = useProductData(id);
  const { user } = useAuth();

  const [selectedSize, setSelectedSize] = useState("S");
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [includeName, setIncludeName] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false); // Nuevo estado para el modal

  const sizes = ["XS", "S", "M", "L", "XL"];

  if (loading) return <p>Cargando producto...</p>;
  if (!product) return <p>No se encontró el producto</p>;

  // Función mejorada para agregar al carrito
  const handleAddToCart = () => {
    try {
      // Validar campos requeridos
      if (!selectedSize) {
        toast.error('Por favor selecciona una talla');
        return;
      }

      if (includeName && !customerName.trim()) {
        toast.error('Por favor ingresa el nombre de tu mascota');
        return;
      }

      // Crear el objeto del producto con la estructura exacta que espera ShoppingCartApp
      const productToAdd = {
        _id: product._id,
        id: product._id,
        name: product.nameProduct,
        nameProduct: product.nameProduct,
        price: parseFloat(product.price) || 0,
        quantity: quantity,
        talla: selectedSize,
        color: null, // Agregar si tienes selección de color
        petName: includeName ? customerName.trim() : null,
        image: product.image,
        productInfo: {
          image: product.image
        }
      };

      console.log('Producto a agregar:', productToAdd); // Debug

      // Obtener carrito existente del localStorage
      let existingCart = [];
      try {
        const savedCart = localStorage.getItem('bandoggie_cart');
        console.log('Carrito existente en localStorage:', savedCart); // Debug
        
        if (savedCart && savedCart !== 'undefined' && savedCart !== 'null') {
          existingCart = JSON.parse(savedCart);
          if (!Array.isArray(existingCart)) {
            existingCart = [];
          }
        }
      } catch (error) {
        console.error('Error parsing existing cart:', error);
        existingCart = [];
      }

      console.log('Carrito parseado:', existingCart); // Debug

      // Verificar si el producto ya existe en el carrito (considerando talla y nombre de mascota)
      const existingItemIndex = existingCart.findIndex(item => 
        item._id === productToAdd._id && 
        item.talla === productToAdd.talla &&
        item.petName === productToAdd.petName
      );

      let updatedCart;
      if (existingItemIndex !== -1) {
        // Si el producto ya existe, actualizar cantidad
        updatedCart = [...existingCart];
        updatedCart[existingItemIndex].quantity += quantity;
        updatedCart[existingItemIndex].subtotal = 
          updatedCart[existingItemIndex].quantity * updatedCart[existingItemIndex].price;
        
        toast.success(`Cantidad actualizada: ${updatedCart[existingItemIndex].quantity} unidades`);
      } else {
        // Si no existe, agregar como nuevo item
        const newItem = {
          ...productToAdd,
          subtotal: productToAdd.price * quantity
        };
        updatedCart = [...existingCart, newItem];
        
        toast.success(`${productToAdd.name} agregado al carrito`);
      }

      console.log('Carrito actualizado:', updatedCart); // Debug

      // Guardar el carrito actualizado en localStorage
      localStorage.setItem('bandoggie_cart', JSON.stringify(updatedCart));
      
      // Disparar evento para que el NavBar y otros componentes se actualicen
      window.dispatchEvent(new Event('cartUpdated'));
      
      // También disparar un evento personalizado con más detalles si es necesario
      window.dispatchEvent(new CustomEvent('cartItemAdded', {
        detail: {
          product: productToAdd,
          cartCount: updatedCart.length,
          totalItems: updatedCart.reduce((sum, item) => sum + item.quantity, 0)
        }
      }));

      console.log('Eventos disparados'); // Debug

    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Error al agregar el producto al carrito');
    }
  };

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

  const totalReviews = reviews?.length || 0;

  const averageRating =
    totalReviews > 0
      ? (
          reviews.reduce((sum, r) => sum + (r.qualification || 0), 0) / totalReviews
        ).toFixed(1)
      : "5.0";

  return (
    <div className="product-page">
       <Toaster position="top-right" reverseOrder={false} />
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
                className={`thumbnail ${selectedImage === index ? "thumbnail-active" : ""}`}
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
            <span>{averageRating}</span>
            <div className="stars">{renderStars(Math.round(averageRating))}</div>
            <span>({totalReviews} evaluaciones)</span>
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
                  className={`size ${selectedSize === size ? "size-active" : ""}`}
                >
                  {size}
                </button>
              ))}
            </div>
            <p className="size-guide">
              <button 
                onClick={() => setShowSizeGuide(true)}
                className="size-guide-button"
                type="button"
              >
                Guía de tallas
              </button>
            </p>
          </div>

          {/* Nombre mascota */}
          <div className="section">
            <div className="customization-toggle">
              <span>Personalizar con nombre</span>
              <input
                type="checkbox"
                checked={includeName}
                onChange={() => setIncludeName(!includeName)}
              />
            </div>

            {includeName && (
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Nombre de tu mascota"
              />
            )}
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
              <button 
                className="btn add-to-cart" 
                onClick={handleAddToCart}
                disabled={!selectedSize || (includeName && !customerName.trim())}
              >
                Añadir al carrito
              </button>
            </div>
            <button className="btn buy-now">Comprar ahora</button>
          </div>
        </div>
      </div>

      {/* Modal de Guía de Tallas */}
      {showSizeGuide && (
        <div className="size-guide-modal-overlay" onClick={() => setShowSizeGuide(false)}>
          <div className="size-guide-modal" onClick={(e) => e.stopPropagation()}>
            <div className="size-guide-header">
              <h3>Guía de Tallas</h3>
              <button 
                className="size-guide-close"
                onClick={() => setShowSizeGuide(false)}
                aria-label="Cerrar guía de tallas"
              >
                <X size={24} />
              </button>
            </div>
            <div className="size-guide-content">
              <img 
                src="/src/img/SelectedProduct/size-guide.png" // Cambia esta ruta por tu imagen de guía de tallas
                alt="Guía de tallas para mascotas"
                className="size-guide-image"
              />
              <div className="size-guide-instructions">
                <h4>Cómo medir a tu mascota:</h4>
                <ul>
                  <li><strong>Cuello:</strong> Mide alrededor del cuello donde normalmente va el collar</li>
                  <li><strong>Pecho:</strong> Mide la parte más ancha del pecho, justo detrás de las patas delanteras</li>
                  <li><strong>Espalda:</strong> Mide desde la base del cuello hasta la base de la cola</li>
                </ul>
                <p><em>Consejo:</em> Si tu mascota está entre dos tallas, elige la talla más grande para mayor comodidad.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reseñas */}
      <Reviews reviews={reviews} productId={product._id} />

      {/* Relacionados */}
      <RelatedProducts products={relatedProducts} />
    </div>
  );
};

export default SelectedProduct;