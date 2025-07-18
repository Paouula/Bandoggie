import { useState, useEffect } from 'react';

const useDataReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalReviews, setTotalReviews] = useState(0);
  const [reviewStats, setReviewStats] = useState(null);

  const API_BASE = 'http://localhost:4000/api/reviews';

  //get
  const fetchReviews = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(API_BASE, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setReviews(data);
      setTotalReviews(data.length);
      
      console.log('Reseñas obtenidas exitosamente:', data);
      return { success: true, data };
      
    } catch (err) {
      const errorMessage = err.message || 'Error al obtener reseñas';
      setError(errorMessage);
      console.error('Error fetching reviews:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // get por id
  const fetchReviewById = async (reviewId) => {
    setLoading(true);
    setError(null);   
    try {
      if (!reviewId) {
        throw new Error('ID de reseña es requerido');
      }

      const response = await fetch(`${API_BASE}/${reviewId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();  
      console.log('Reseña obtenida por ID:', data);
      return { success: true, data };
      
    } catch (err) {
      const errorMessage = err.message || 'Error al obtener reseña';
      setError(errorMessage);
      console.error('Error fetching review by ID:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // post 
  const createReview = async (reviewData, images = []) => {
    setLoading(true);
    setError(null);
    try {
      // Validar datos requeridos
      if (!reviewData.qualification || !reviewData.Coment || !reviewData.idClients || !reviewData.idProducts) {
        throw new Error('Faltan campos requeridos: qualification, Coment, idClients, idProducts');
      }
      // Validar calificación
      if (reviewData.qualification < 1 || reviewData.qualification > 5) {
        throw new Error('La calificación debe estar entre 1 y 5');
      }
      const formData = new FormData();
      formData.append('qualification', reviewData.qualification);
      formData.append('Coment', reviewData.Coment);
      formData.append('idClients', reviewData.idClients);
      formData.append('idProducts', reviewData.idProducts);
      
      // Agregar hasta 3 imágenes
      if (images.length > 0) {
        images.forEach((image, index) => {
          if (index < 3) { // Máximo 3 imágenes
            formData.append(`imagen${index + 1}`, image);
          }
        });
      }
      const response = await fetch(API_BASE, {
        method: 'POST',
        body: formData, 
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
      }
      const result = await response.json();
      const newReview = result.review;
      
      // Actualizar estado local
      setReviews(prevReviews => [newReview, ...prevReviews]);
      setTotalReviews(prev => prev + 1);
      
      console.log('Reseña creada exitosamente:', result.message);
      return { success: true, data: newReview, message: result.message };
      
    } catch (err) {
      const errorMessage = err.message || 'Error al crear reseña';
      setError(errorMessage);
      console.error('Error creating review:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // put
  const updateReview = async (reviewId, reviewData, images = []) => {
    setLoading(true);
    setError(null);

    try {
      // Validar ID
      if (!reviewId) {
        throw new Error('ID de reseña es requerido');
      }

      // Validar calificación si se proporciona
      if (reviewData.qualification !== undefined && (reviewData.qualification < 1 || reviewData.qualification > 5)) {
        throw new Error('La calificación debe estar entre 1 y 5');
      }

      const formData = new FormData();
      
      if (reviewData.qualification !== undefined) {
        formData.append('qualification', reviewData.qualification);
      }
      if (reviewData.Coment !== undefined) {
        formData.append('Coment', reviewData.Coment);
      }
      if (reviewData.idClients !== undefined) {
        formData.append('idClients', reviewData.idClients);
      }
      if (reviewData.idProducts !== undefined) {
        formData.append('idProducts', reviewData.idProducts);
      }
      
      // Agregar nuevas imágenes si existen
      if (images.length > 0) {
        images.forEach((image, index) => {
          if (index < 3) { // Máximo 3 imágenes
            formData.append(`imagen${index + 1}`, image);
          }
        });
      }

      const response = await fetch(`${API_BASE}/${reviewId}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      const updatedReview = result.review;
      
      // Actualizar estado local
      setReviews(prevReviews => 
        prevReviews.map(review => 
          review._id === reviewId ? updatedReview : review
        )
      );
      
      console.log('Reseña actualizada exitosamente:', result.message);
      return { success: true, data: updatedReview, message: result.message };
      
    } catch (err) {
      const errorMessage = err.message || 'Error al actualizar reseña';
      setError(errorMessage);
      console.error('Error updating review:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

 //delete
  const deleteReview = async (reviewId) => {
    setLoading(true);
    setError(null);

    try {
      // Validar ID
      if (!reviewId) {
        throw new Error('ID de reseña es requerido');
      }

      const response = await fetch(`${API_BASE}/${reviewId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      
      // Actualizar estado local
      setReviews(prevReviews => 
        prevReviews.filter(review => review._id !== reviewId)
      );
      setTotalReviews(prev => prev - 1);
      
      console.log('Reseña eliminada exitosamente:', result.message);
      return { success: true, data: result, message: result.message };
      
    } catch (err) {
      const errorMessage = err.message || 'Error al eliminar reseña';
      setError(errorMessage);
      console.error('Error deleting review:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // get por producto
  const fetchReviewsByProduct = async (productId) => {
    setLoading(true);
    setError(null);
    
    try {
      if (!productId) {
        throw new Error('ID de producto es requerido');
      }

      const response = await fetch(`${API_BASE}/product/${productId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      
      console.log('Reseñas por producto obtenidas:', data);
      return { success: true, data };
      
    } catch (err) {
      const errorMessage = err.message || 'Error al obtener reseñas por producto';
      setError(errorMessage);
      console.error('Error fetching reviews by product:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // get por cliente
  const fetchReviewsByClient = async (clientId) => {
    setLoading(true);
    setError(null);
    
    try {
      if (!clientId) {
        throw new Error('ID de cliente es requerido');
      }
      const response = await fetch(`${API_BASE}/client/${clientId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      
      console.log('Reseñas por cliente obtenidas:', data);
      return { success: true, data };
      
    } catch (err) {
      const errorMessage = err.message || 'Error al obtener reseñas por cliente';
      setError(errorMessage);
      console.error('Error fetching reviews by client:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // get por calificación
  const fetchReviewsByQualification = async (qualification) => {
    setLoading(true);
    setError(null);
    
    try {
      const qualificationNum = parseInt(qualification);
      
      if (qualificationNum < 1 || qualificationNum > 5) {
        throw new Error('La calificación debe estar entre 1 y 5');
      }

      const response = await fetch(`${API_BASE}/qualification/${qualificationNum}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      console.log('Reseñas por calificación obtenidas:', data);
      return { success: true, data };
      
    } catch (err) {
      const errorMessage = err.message || 'Error al obtener reseñas por calificación';
      setError(errorMessage);
      console.error('Error fetching reviews by qualification:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // get estadísticas de reseñas por producto
  const fetchProductReviewStats = async (productId) => {
    setLoading(true);
    setError(null);
    
    try {
      if (!productId) {
        throw new Error('ID de producto es requerido');
      }

      const response = await fetch(`${API_BASE}/stats/product/${productId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setReviewStats(data);
      
      console.log('Estadísticas de reseñas obtenidas:', data);
      return { success: true, data };
      
    } catch (err) {
      const errorMessage = err.message || 'Error al obtener estadísticas';
      setError(errorMessage);
      console.error('Error fetching product stats:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Buscar reseñas por término
  const searchReviews = (searchTerm) => {
    if (!searchTerm.trim()) return reviews;
    
    return reviews.filter(review => 
      review.Coment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.idClients?.nameClient?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.idProducts?.nameProduct?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Filtrar reseñas por calificación
  const filterReviewsByRating = (rating) => {
    if (!rating) return reviews;
    return reviews.filter(review => review.qualification === parseInt(rating));
  };

  // Ordenar reseñas
  const sortReviews = (sortBy) => {
    let sortedReviews = [...reviews];
    
    switch (sortBy) {
      case 'newest':
        return sortedReviews.sort((a, b) => 
          new Date(b.publicationDate) - new Date(a.publicationDate)
        );
      case 'oldest':
        return sortedReviews.sort((a, b) => 
          new Date(a.publicationDate) - new Date(b.publicationDate)
        );
      case 'highest':
        return sortedReviews.sort((a, b) => b.qualification - a.qualification);
      case 'lowest':
        return sortedReviews.sort((a, b) => a.qualification - b.qualification);
      default:
        return sortedReviews;
    }
  };

  // Obtener reseña por ID
  const getReviewById = (reviewId) => {
    return reviews.find(review => review._id === reviewId);
  };

  // Calcular estadísticas básicas
  const calculateStats = () => {
    if (reviews.length === 0) {
      return {
        totalReviews: 0,
        averageRating: 0,
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      };
    }

    const totalReviews = reviews.length;
    const averageRating = reviews.reduce((sum, review) => sum + review.qualification, 0) / totalReviews;
    const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    
    reviews.forEach(review => {
      ratingDistribution[review.qualification]++;
    });

    return {
      totalReviews,
      averageRating: Math.round(averageRating * 100) / 100,
      ratingDistribution
    };
  };

  // Validar datos de reseña
  const validateReviewData = (reviewData) => {
    const errors = [];
    
    if (!reviewData.qualification) {
      errors.push('La calificación es requerida');
    } else if (reviewData.qualification < 1 || reviewData.qualification > 5) {
      errors.push('La calificación debe estar entre 1 y 5');
    }
    
    if (!reviewData.Coment?.trim()) {
      errors.push('El comentario es requerido');
    }
    
    if (!reviewData.idClients) {
      errors.push('El ID del cliente es requerido');
    }
    
    if (!reviewData.idProducts) {
      errors.push('El ID del producto es requerido');
    }
    
    return errors;
  };

  // Limpiar errores
  const clearError = () => {
    setError(null);
  };

  const refreshReviews = () => {
    return fetchReviews();
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return {
    reviews,
    loading,
    error,
    totalReviews,
    reviewStats,
    
    // CRUD
    fetchReviews,
    fetchReviewById,
    createReview,
    updateReview,
    deleteReview,
    
    // Operaciones específicas
    fetchReviewsByProduct,
    fetchReviewsByClient,
    fetchReviewsByQualification,
    fetchProductReviewStats,
    
    // Funciones de utilidad
    searchReviews,
    filterReviewsByRating,
    sortReviews,
    getReviewById,
    calculateStats,
    validateReviewData,
    clearError,
    refreshReviews,
  };
};

export default useDataReview;