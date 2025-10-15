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
import Input from "../../../components/Input/Input.jsx";

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
    <div className="product-page-selectedProduct">
  <Toaster position="top-right" reverseOrder={false} />

  {/* Breadcrumb */}
  <div className="breadcrumb-selectedProduct">
    <Link to="/">Inicio</Link>
    <ChevronRight size={16} />
    <Link to={`/category/${product.idCategory?._id}`}>
      {product.idCategory?.name}
    </Link>
    <ChevronRight size={16} />
    <span className="breadcrumb-active-selectedProduct">{product.nameProduct}</span>
  </div>

  <div className="product-container-selectedProduct">
    {/* Imágenes */}
    <div className="product-images-selectedProduct">
      <div className="main-image-wrapper-selectedProduct">
        <button
          className="nav-arrow-selectedProduct nav-arrow-left-selectedProduct"
          onClick={prevImage}
          aria-label="Imagen anterior"
        >
          <ChevronLeft size={30} />
        </button>

        <img
          src={allImages[selectedImage] || "/api/placeholder/400/400"}
          alt={`${product.nameProduct} imagen ${selectedImage + 1}`}
          className="main-image-selectedProduct"
        />

        <button
          className="nav-arrow-selectedProduct nav-arrow-right-selectedProduct"
          onClick={nextImage}
          aria-label="Imagen siguiente"
        >
          <ChevronRightIcon size={30} />
        </button>
      </div>

      {/* Miniaturas */}
      <div className="thumbnail-row-selectedProduct">
        {allImages.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`thumbnail-selectedProduct ${
              selectedImage === index ? "thumbnail-active-selectedProduct" : ""
            }`}
            aria-label={`Ver imagen ${index + 1}`}
          >
            <img src={img} alt={`Miniatura ${index + 1}`} />
          </button>
        ))}
      </div>
    </div>

    {/* Info producto */}
    <div className="product-info-selectedProduct">
      <h1>{product.nameProduct}</h1>
      <p className="price-selectedProduct">Desde ${product.price}</p>

      <div className="rating-selectedProduct">
        <span>{averageRating}</span>
        <div className="stars">{renderStars(Math.round(averageRating))}</div>
        <span>({totalReviews} evaluaciones)</span>
      </div>

      <p className="description-review-selectedProduct">{product.description}</p>

      {/* Tallas */}
      <div className="section-selectedProduct">
        <h4>Talla</h4>
        <div className="sizes-selectedProduct">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`size-selectedProduct ${
                selectedSize === size ? "size-active-selectedProduct" : ""
              }`}
            >
              {size}
            </button>
          ))}
        </div>
        <p className="size-guide-selectedProduct">
          <button
            onClick={() => setShowSizeGuide(true)}
            className="size-guide-button-selectedProduct"
            type="button"
          >
            Guía de tallas
          </button>
        </p>
      </div>

      {/* Nombre mascota */}
      <div className="section-selectedProduct">
        <div className="customization-toggle-selectedProduct">
          <span>Personalizar con nombre</span>
          <input
            type="checkbox"
            checked={includeName}
            onChange={() => setIncludeName(!includeName)}
          />
        </div>

        {includeName && (
          <Input
            type="text"
            className="input-selectedProduct"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Nombre de tu mascota"
          />
        )}
      </div>

      {/* Acciones */}
      <div className="actions-selectedProduct">
        <div className="top-action-row-selectedProduct">
          <select
            className="quantity-reviews-selectedProduct"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
              <option key={num}>{num}</option>
            ))}
          </select>

          <button
            className="btn-selectedProduct add-to-cart-selectedProduct"
            onClick={handleAddToCart}
            disabled={!selectedSize || (includeName && !customerName.trim())}
          >
            Añadir al carrito
          </button>
        </div>

        <button className="btn-selectedProduct buy-now-selectedProduct">
          Comprar ahora
        </button>
      </div>
    </div>
  </div>

  {/* Modal de Guía de Tallas */}
  {showSizeGuide && (
    <div
      className="size-guide-modal-overlay-selectedProduct"
      onClick={() => setShowSizeGuide(false)}
    >
      <div
        className="size-guide-modal-selectedProduct"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="size-guide-header-selectedProduct">
          <h3>Guía de Tallas</h3>
          <button
            className="size-guide-close-selectedProduct"
            onClick={() => setShowSizeGuide(false)}
            aria-label="Cerrar guía de tallas"
          >
            <X size={24} />
          </button>
        </div>
        <div className="size-guide-content-selectedProduct">
          <img
            src="/src/img/SelectedProduct/size-guide.png"
            alt="Guía de tallas para mascotas"
            className="size-guide-image-selectedProduct"
          />
          <div className="size-guide-instructions-selectedProduct">
            <h4>Cómo medir a tu mascota:</h4>
            <ul>
              <li>
                <strong>Cuello:</strong> Mide alrededor del cuello donde
                normalmente va el collar
              </li>
              <li>
                <strong>Pecho:</strong> Mide la parte más ancha del pecho, justo
                detrás de las patas delanteras
              </li>
              <li>
                <strong>Espalda:</strong> Mide desde la base del cuello hasta la
                base de la cola
              </li>
            </ul>
            <p>
              <em>Consejo:</em> Si tu mascota está entre dos tallas, elige la
              talla más grande para mayor comodidad.
            </p>
          </div>
        </div>
      </div>
    </div>
  )}

  {/* Reseñas */}
  <div className="reviews-selectedProduct">
    <Reviews reviews={reviews} productId={product._id} />
  </div>

  {/* Relacionados */}
  <RelatedProducts products={relatedProducts} />
</div>
  );
};

export default SelectedProduct;