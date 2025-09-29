import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { API_FETCH_FORM, API_FETCH_JSON } from '../../config'; 

// Función reutilizable para construir el FormData
const buildFormData = (productData) => {
  const {
    nameProduct,
    price,
    description,
    image,
    designImages,
    idHolidayProduct,
    idCategory,
  } = productData;

  const formData = new FormData();
  formData.append('nameProduct', nameProduct);
  formData.append('price', price);
  formData.append('description', description);

  if (image) {
    formData.append('image', image);
  }

  if (Array.isArray(designImages)) {
    designImages.forEach((file) => {
      formData.append('designImages', file);
    });
  }

  formData.append('idHolidayProduct', idHolidayProduct);
  formData.append('idCategory', idCategory);

  return formData;
};

// Hook principal
const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Endpoints
  const endpoint = 'products';
  const categoriesEndpoint = 'categories';

  // --- Productos ---
  const handleGetProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await API_FETCH_JSON(endpoint);
      setProducts(data);
      return data;
    } catch (err) {
      setError('Error al obtener los productos');
      toast.error('Error al obtener los productos');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handlePostProducts = async (productData) => {
    try {
      setLoading(true);
      setError(null);

      const formData = buildFormData(productData);
      const data = await API_FETCH_FORM(endpoint, formData, { method: 'POST' });

      setProducts((prev) => [...prev, data]);
      toast.success('Producto creado correctamente');
      return data;
    } catch (err) {
      setError('Error al crear el producto');
      toast.error('Error al crear el producto');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handlePutProducts = async (id, productData) => {
    try {
      setLoading(true);
      setError(null);

      const formData = buildFormData(productData);
      const data = await API_FETCH_FORM(`${endpoint}/${id}`, formData, { method: 'PUT' });

      setProducts((prev) =>
        prev.map((p) => (p._id === id ? data : p))
      );
      toast.success('Producto actualizado correctamente');
      return data;
    } catch (err) {
      setError('Error al actualizar el producto');
      toast.error('Error al actualizar el producto');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProducts = async (id) => {
    try {
      setLoading(true);
      setError(null);

      await API_FETCH_JSON(`${endpoint}/${id}`, { method: 'DELETE' });

      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success('Producto eliminado correctamente');
    } catch (err) {
      setError('Error al eliminar el producto');
      toast.error('Error al eliminar el producto');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleGetProductById = async (id) => {
    try {
      setLoading(true);
      return await API_FETCH_JSON(`${endpoint}/${id}`);
    } catch (err) {
      setError('Error al obtener el producto');
      toast.error('Error al obtener el producto');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleGetProductsByCategory = async (categoryId) => {
    try {
      setLoading(true);
      return await API_FETCH_JSON(`${endpoint}/category/${categoryId}`);
    } catch (err) {
      setError('Error al obtener productos por categoría');
      toast.error('Error al obtener productos por categoría');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleSearchProducts = async (searchTerm) => {
    try {
      setLoading(true);
      return await API_FETCH_JSON(`${endpoint}/search?q=${encodeURIComponent(searchTerm)}`);
    } catch (err) {
      setError('Error al buscar productos');
      toast.error('Error al buscar productos');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // --- Categorías ---
  const handleGetCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await API_FETCH_JSON(categoriesEndpoint);
      setCategories(data);
      return data;
    } catch (err) {
      setError('Error al obtener las categorías');
      toast.error('Error al obtener las categorías');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Recargar datos
  const refreshData = async () => {
    try {
      await Promise.all([handleGetProducts(), handleGetCategories()]);
    } catch (err) {
      console.error('Error refreshing data:', err);
    }
  };

  // Al montar el hook
  useEffect(() => {
    refreshData();
  }, []);

  return {
    products,
    setProducts,
    categories,
    setCategories,
    loading,
    error,

    // Productos
    handleGetProducts,
    handlePostProducts,
    handlePutProducts,
    handleDeleteProducts,
    handleGetProductById,
    handleGetProductsByCategory,
    handleSearchProducts,

    // Categorías
    handleGetCategories,

    // Utilidades
    refreshData,
    setError,
    setLoading,
  };
};

export default useFetchProducts;
