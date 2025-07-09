import React, { useState } from 'react';
import './Reviews.css';
import ReviewsBanner from '../../../img/Reseñas/ReviewsBanner.png';
import BannerPrivate from '../../../components/Private/BannerPrivate/BannerPrivate.jsx';
import FilterIcon from '@mui/icons-material/Filter';
import Paginacion from '../../../components/Paginacion.jsx';
import ReviewModal from '../../../components/Private/Reviews/ReviewModal.jsx';
import ListReviews from '../../../components/Private/Reviews/ListReviews.jsx';

const Reviewslisting = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReviews, setSelectedReviews] = useState(new Set());
  const [selectedReviewModal, setSelectedReviewModal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const reviews = [
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

  const filteredReviews = reviews.filter(review =>
    review.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleReviewSelection = (reviewId) => {
    const newSelected = new Set(selectedReviews);
    newSelected.has(reviewId) ? newSelected.delete(reviewId) : newSelected.add(reviewId);
    setSelectedReviews(newSelected);
  };

  const openModal = (review) => {
    setSelectedReviewModal(review);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedReviewModal(null);
    setIsModalOpen(false);
  };

  const handleApprove = (id) => {
    toggleReviewSelection(id);
    closeModal();
  };

  const handleReject = (id) => {
    console.log('Rechazar reseña:', id);
    closeModal();
  };

  return (
    <div className="reviews-listing">
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
      <input
        type="text"
        placeholder="Buscar..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  </div>

  <ListReviews
    reviews={filteredReviews}
    selectedReviews={selectedReviews}
    onApprove={handleApprove}
    onReject={handleReject}
    onOpenModal={openModal}
  />

  <Paginacion />
</div>

      <ReviewModal
        isOpen={isModalOpen}
        onClose={closeModal}
        product={selectedReviewModal}
        onApprove={() => handleApprove(selectedReviewModal?.id)}
        onReject={() => handleReject(selectedReviewModal?.id)}
        isApproved={selectedReviews.has(selectedReviewModal?.id)}
      />
    </div>
  );
};

export default Reviewslisting;
