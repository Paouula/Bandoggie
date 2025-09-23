import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
//Importo las funciones globales para realizar el fetch
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
        idCategory
    } = productData;

    const formData = new FormData();
    formData.append('nameProduct', nameProduct);
    formData.append('price', price);
    formData.append('description', description);

    if (image) {
        formData.append('image', image);
    }

    if (Array.isArray(designImages)) {
        designImages.forEach((file, index) => {
            formData.append('designImages', file);
        });
    }

    formData.append('idHolidayProduct', idHolidayProduct);
    formData.append('idCategory', idCategory);

    for (let pair of formData.entries()) {
        console.log(pair[0] + ':', pair[1]);
    }

    return formData;
};

//Constante que contendrá los métodos
const useFetchProducts = () => {
    //Estados para productos y categorías
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //Declaro el endpoint
    const endpoint = 'products';
    const categoriesEndpoint = 'categories';

    //Obtiene todos los productos
    const handleGetProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const data = await API_FETCH_JSON(endpoint);
            setProducts(data);
            console.log("data de productos", data);
            return data;
        } catch (error) {
            setError('Error al obtener los productos');
            toast.error('Error al obtener los productos');
            console.log(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    //Obtiene todas las categorías
    const handleGetCategories = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const data = await API_FETCH_JSON(categoriesEndpoint);
            setCategories(data);
            console.log("data de categorias", data);
            return data;
        } catch (error) {
            setError('Error al obtener las categorías');
            toast.error('Error al obtener las categorías');
            console.log(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Función alternativa usando fetch directo (como en el .jsx)
    const getProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://bandoggie-production.up.railway.app/api/products');

            if (!response.ok) {
                toast.error("Error al traer los productos");
                throw new Error('Error al traer los productos');
            }

            const data = await response.json();
            setProducts(data);
            console.log("data de productos", data);
            return data;

        } catch (error) {
            setError(error.message);
            console.log(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Función alternativa usando fetch directo para categorías
    const getCategories = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:4000/api/categories');

            if (!response.ok) {
                toast.error("Error al traer las categorias");
                throw new Error('Error al traer las categorías');
            }

            const data = await response.json();
            setCategories(data);
            console.log("data de categorias", data);
            return data;

        } catch (error) {
            setError(error.message);
            console.log(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    //Crea un nuevo producto
    const handlePostProducts = async (productData) => {
        try {
            setLoading(true);
            setError(null);
            
            const formData = buildFormData(productData);
            const data = await API_FETCH_FORM(endpoint, formData, {
                method: 'POST',
            });

            // Actualizar la lista de productos localmente
            setProducts(prevProducts => [...prevProducts, data]);
            
            toast.success('Producto creado correctamente');
            return data;

        } catch (error) {
            setError('Error al crear el producto');
            toast.error('Error al crear el producto');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    //Actualiza un producto ya existente
    const handlePutProducts = async (id, productData) => {
        try {
            setLoading(true);
            setError(null);
            
            const formData = buildFormData(productData);
            const data = await API_FETCH_FORM(`${endpoint}/${id}`, formData, {
                method: 'PUT',
            });

            // Actualizar la lista de productos localmente
            setProducts(prevProducts => 
                prevProducts.map(product => 
                    product._id === id ? data : product
                )
            );

            toast.success('Producto actualizado correctamente');
            return data;
        } catch (error) {
            setError('Error al actualizar el producto');
            toast.error('Error al actualizar el producto');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    //Elimina un producto
    const handleDeleteProducts = async (id) => {
        try {
            setLoading(true);
            setError(null);
            
            await API_FETCH_JSON(`${endpoint}/${id}`, {
                method: 'DELETE',
            });

            // Actualizar la lista de productos localmente
            setProducts(prevProducts => 
                prevProducts.filter(product => product._id !== id)
            );

            toast.success('Producto eliminado correctamente');
        } catch (error) {
            setError('Error al eliminar el producto');
            toast.error('Error al eliminar el producto');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    //Obtener producto por ID
    const handleGetProductById = async (id) => {
        try {
            setLoading(true);
            setError(null);
            
            const data = await API_FETCH_JSON(`${endpoint}/${id}`);
            return data;
        } catch (error) {
            setError('Error al obtener el producto');
            toast.error('Error al obtener el producto');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    //Buscar productos por categoría
    const handleGetProductsByCategory = async (categoryId) => {
        try {
            setLoading(true);
            setError(null);
            
            const data = await API_FETCH_JSON(`${endpoint}/category/${categoryId}`);
            return data;
        } catch (error) {
            setError('Error al obtener productos por categoría');
            toast.error('Error al obtener productos por categoría');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    //Buscar productos por nombre
    const handleSearchProducts = async (searchTerm) => {
        try {
            setLoading(true);
            setError(null);
            
            const data = await API_FETCH_JSON(`${endpoint}/search?q=${encodeURIComponent(searchTerm)}`);
            return data;
        } catch (error) {
            setError('Error al buscar productos');
            toast.error('Error al buscar productos');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    //Recargar datos
    const refreshData = async () => {
        try {
            await Promise.all([
                handleGetProducts(),
                handleGetCategories()
            ]);
        } catch (error) {
            console.error('Error refreshing data:', error);
        }
    };

    // Cargar datos al inicializar el hook
    useEffect(() => {
        refreshData();
    }, []);

    return {
        // Estados
        products,
        setProducts,
        categories,
        setCategories,
        loading,
        error,

        // Funciones CRUD para productos
        handlePostProducts,
        handleGetProducts,
        handlePutProducts,
        handleDeleteProducts,
        handleGetProductById,
        handleGetProductsByCategory,
        handleSearchProducts,

        // Funciones para categorías
        handleGetCategories,

        // Funciones alternativas con fetch directo
        getProducts,
        getCategories,

        // Utilidades
        refreshData,
        setError,
        setLoading
    };
};

export default useFetchProducts;