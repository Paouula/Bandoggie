import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import "./Reviews.css";
import ReviewsBanner from "../../../img/Reseñas/ReviewsBanner.png";
import BannerPrivate from "../../../components/Private/BannerPrivate/BannerPrivate.jsx";
import FilterIcon from "@mui/icons-material/Filter";
import Paginacion from "../../../components/Pagination.jsx";
import ReviewModal from "../../../components/Private/Reviews/ReviewModal/ReviewModal.jsx";
import ListReviews from "../../../components/Private/Reviews/ListReviews.jsx";

// Importacion de componentes
import Loading from "../../../components/LoadingScreen/LoadingScreen.jsx";

// Hook para obtener reseñas
import useFetchReviews from "../../../hooks/ReviewUser/useFetchReviews.js";
import { set } from "react-hook-form";

const Reviewslisting = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReviews, setSelectedReviews] = useState(new Set());
  const [rejectedReviews, setRejectedReviews] = useState(new Set()); // Nuevo estado para reviews rechazadas
  const [selectedReviewModal, setSelectedReviewModal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Estos hook encapsula la logica de las peticiones a la API
  const {
    handleGetReviews,
    handleDeleteReviews,
    handleVerifyReviews,
    handleRejectReviews,
  } = useFetchReviews();

  const loadReviews = async () => {
    try {
      const data = await handleGetReviews();
      setReviews(data);
      return data;
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar reseñas");
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        await loadReviews();
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const toggleReviewSelection = (reviewId) => {
    const newSelected = new Set(selectedReviews);
    const newRejected = new Set(rejectedReviews);
    
    // Si está seleccionado, lo deselecciona
    if (newSelected.has(reviewId)) {
      newSelected.delete(reviewId);
    } else {
      // Si no está seleccionado, lo selecciona y lo quita de rechazados
      newSelected.add(reviewId);
      newRejected.delete(reviewId);
    }
    
    setSelectedReviews(newSelected);
    setRejectedReviews(newRejected);
  };

  const toggleReviewRejection = (reviewId) => {
    const newRejected = new Set(rejectedReviews);
    const newSelected = new Set(selectedReviews);
    
    // Si está rechazado, lo quita del rechazo
    if (newRejected.has(reviewId)) {
      newRejected.delete(reviewId);
    } else {
      // Si no está rechazado, lo rechaza y lo quita de seleccionados
      newRejected.add(reviewId);
      newSelected.delete(reviewId);
    }
    
    setRejectedReviews(newRejected);
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
    console.log("Rechazar reseña:", id);
    toggleReviewRejection(id);
    closeModal();
  };

  // Función para manejar verificación (aprobar)
  const handleVerifyWrapper = async (id) => {
    try {
      await handleVerifyReviews(id);
      toggleReviewSelection(id);
    } catch (error) {
      toast.error("Error al aprobar reseña");
    }
  };

  // Función para manejar rechazo
  const handleRejectWrapper = async (id) => {
    try {
      await handleRejectReviews(id);
      toggleReviewRejection(id);
    } catch (error) {
      toast.error("Error al rechazar reseña");
    }
  };

  if (error) {
    return (
      <div className="reviews-listing">
        Error al cargar reseñas: {error.message}
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      {loading && (
        <div className="loading-overlay">
          <Loading message="Cargando reviews..." />
        </div>
      )}

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
            reviews={reviews}
            selectedReviews={selectedReviews}
            rejectedReviews={rejectedReviews} // Nueva prop
            onApprove={handleApprove}
            onReject={handleRejectWrapper} // Usar wrapper con lógica de API
            onOpenModal={openModal}
            onVerify={handleVerifyWrapper} // Usar wrapper con lógica de API
          />

          <Paginacion />
        </div>

        <ReviewModal
          isOpen={isModalOpen}
          onClose={closeModal}
          review={selectedReviewModal}
          onApprove={() => handleApprove(selectedReviewModal?._id)}
          onReject={() => handleRejectWrapper(selectedReviewModal?._id)} 
          onVerify={() => handleVerifyWrapper(selectedReviewModal?._id)} 
          isApproved={selectedReviews.has(selectedReviewModal?._id)}
        />
      </div>
    </>
  );
};

export default Reviewslisting;