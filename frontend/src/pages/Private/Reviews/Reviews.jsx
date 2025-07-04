import React, { useState } from 'react';
import './Reviews.css';
import ReviewsBanner from '../../../img/Reseñas/ReviewsBanner.png';
import BannerPrivate from '../../../components/Private/BannerPrivate/BannerPrivate.jsx';
import SearchIcon from '@mui/icons-material/Search';
import Paginacion from '../../../components/Paginacion.jsx';
import FilterIcon from '@mui/icons-material/Filter';
import DeleteButton from '../../../components/Private/DeleteButton.jsx';
import AproveButton from '../../../components/Private/AproveButton.jsx';
import ReviewModal from '../../../components/Private/Reviews/ReviewModal.jsx'; // Ajusta la ruta según tu estructura

const ProductListing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProducts, setSelectedProducts] = useState(new Set());
  const [selectedProductModal, setSelectedProductModal] = useState(null);
  const [expandedCards, setExpandedCards] = useState(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const products = [
    {
      id: 1,
      name: "Bandana con bordado",
      price: 12.99,
      image: "https://i.etsystatic.com/18683011/r/il/14a35c/6939527310/il_1588xN.6939527310_flrw.jpg",
      user: "JuliaHernandez09",
      rating: 5,
      publishDate: "12/01/2025",
      comment: "De muy buena calidad la bandana de tela lisa con delicados estampados bordados, ideal para darle un toque de estilo y personalidad a tu mascota."
    },
    {
      id: 2,
      name: "Bandana con bordado",
      price: 12.99,
      image: "https://i.etsystatic.com/18683011/r/il/14a35c/6939527310/il_1588xN.6939527310_flrw.jpg",
      user: "JuliaHernandez09",
      rating: 5,
      publishDate: "12/01/2025",
      comment: "De muy buena calidad bandana de tela lisa con delicados estampados bordados, ideal para darle un toque de estilo y personalidad a tu mascot..."
    },
    {
      id: 3,
      name: "Bandana con bordado",
      price: 12.99,
      image: "https://i.etsystatic.com/18683011/r/il/14a35c/6939527310/il_1588xN.6939527310_flrw.jpg",
      user: "JuliaHernandez09",
      rating: 5,
      publishDate: "12/01/2025",
      comment: "De muy buena calidad la bandana de tela lisa con delicados estampados bordados, ideal para darle un toque de estilo y personalidad a tu mascota."
    },
    {
      id: 4,
      name: "Bandana con bordado",
      price: 12.99,
      image: "https://i.etsystatic.com/18683011/r/il/14a35c/6939527310/il_1588xN.6939527310_flrw.jpg",
      user: "JuliaHernandez09",
      rating: 5,
      publishDate: "12/01/2025",
      comment: "De muy buena calidad bandana de tela lisa con delicados estampados bordados, ideal para darle un toque de estilo y personalidad a tu mascot..."
    }
  ];

  const toggleCardExpansion = (productId) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(productId)) {
      newExpanded.delete(productId);
    } else {
      newExpanded.add(productId);
    }
    setExpandedCards(newExpanded);
  };

  const toggleProductSelection = (productId) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
    } else {
      newSelected.add(productId);
    }
    setSelectedProducts(newSelected);
  };

  const openModal = (product) => {
    setSelectedProductModal(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProductModal(null);
    setIsModalOpen(false);
  };

  const handleApprove = (productId) => {
    toggleProductSelection(productId);
    closeModal();
  };

  const handleReject = (productId) => {
    // Lógica para rechazar la reseña
    console.log('Rechazar reseña:', productId);
    closeModal();
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-listing">
     <div className="banner-private-wrapper">
        <BannerPrivate
            title="Reseñas"
            subtitle="Reseñas de los clientes listas para aprobar o desaprobar"
            mainImage={ReviewsBanner}
        />
        </div>


      <div className="reviews-content">
        <div className="header">
          <div className="filter-section">
            <button className="filter-btn">
              <FilterIcon size={18} />
              Filtrar
            </button>
            <select className="sort-select">
              <option>Ordenar por: Por defecto</option>
              <option>Precio: Menor a mayor</option>
              <option>Precio: Mayor a menor</option>
              <option>Más recientes</option>
              <option>Mejor valorados</option>
            </select>
          </div>
          
          <div className="search-container">
            <SearchIcon className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Buscar..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="products-grid">
          {filteredProducts.length === 0 ? (
            <div className="no-reviews">
              <div className="no-reviews-icon">📝</div>
              <div>No hay reseñas pendientes</div>
            </div>
          ) : (
            filteredProducts.map((product) => {
              const isExpanded = expandedCards.has(product.id);
              return (
                <div 
                  key={product.id} 
                  className={`product-card ${isExpanded ? 'expanded' : ''}`}
                  onClick={() => openModal(product)}
                >
                  <div className="product-header">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="product-image"
                    />
                    <div className="product-info">
                      <h3 className="product-name">{product.name}</h3>
                      <p className="product-price">${product.price}</p>
                    </div>
                    <div className="product-actions" onClick={(e) => e.stopPropagation()}>
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => handleReject(product.id)}
                      >
                        <DeleteButton size={18} />
                      </button>
                      <button 
                        className={`action-btn check-btn ${selectedProducts.has(product.id) ? 'selected' : ''}`}
                        onClick={() => toggleProductSelection(product.id)}
                      >
                        <AproveButton size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="product-content">
                    <div className="product-details">
                      <div className="detail-item">
                        <div className="detail-label">Usuario:</div>
                        <div className="detail-value">{product.user}</div>
                      </div>
                      <div className="detail-item">
                        <div className="detail-label">Producto:</div>
                        <div className="detail-value">{product.name}</div>
                      </div>
                      <div className="detail-item">
                        <div className="detail-label">Puntuación:</div>
                        <div className="detail-value">
                          <div className="rating">
                            {renderStars(product.rating)}
                          </div>
                        </div>
                      </div>
                      <div className="detail-item">
                        <div className="detail-label">Publicación:</div>
                        <div className="detail-value">{product.publishDate}</div>
                      </div>
                    </div>

                    <div className="comment-section">
                      <div className="detail-label">Comentario:</div>
                      <div className={`comment ${isExpanded ? 'expanded' : ''}`}>
                        {product.comment}
                        {!isExpanded && product.comment.length > 100 && (
                          <div className="expand-indicator">+</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <Paginacion/>
      </div>

      {/* Modal */}
      <ReviewModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        product={selectedProductModal}
        onApprove={() => handleApprove(selectedProductModal?.id)}
        onReject={() => handleReject(selectedProductModal?.id)}
        isApproved={selectedProducts.has(selectedProductModal?.id)}
      />
    </div>
  );
};

export default ProductListing;