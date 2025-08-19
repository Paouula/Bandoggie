import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { toast } from 'react-hot-toast';

// Configuración de la API
const API_BASE_URL = 'http://localhost:4000/api';

// Función helper para realizar peticiones HTTP
const apiRequest = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}/${endpoint}`;
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    };

    // Para FormData, remover Content-Type para que el navegador lo establezca automáticamente
    if (options.body instanceof FormData) {
        delete config.headers['Content-Type'];
    }

    const response = await fetch(url, config);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
};

// Función para construir FormData
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

    // Validaciones
    if (!nameProduct?.trim()) throw new Error('El nombre del producto es requerido');
    if (!price || isNaN(price) || parseFloat(price) <= 0) throw new Error('El precio debe ser un número válido mayor a 0');
    if (!description?.trim()) throw new Error('La descripción es requerida');
    if (!idCategory) throw new Error('La categoría es requerida');
    if (!idHolidayProduct) throw new Error('La festividad es requerida');

    const formData = new FormData();
    formData.append('nameProduct', nameProduct.trim());
    formData.append('price', parseFloat(price));
    formData.append('description', description.trim());
    formData.append('idHolidayProduct', idHolidayProduct);
    formData.append('idCategory', idCategory);

    // Manejar imagen principal
    if (image instanceof File) {
        formData.append('image', image);
    }

    // Manejar imágenes de diseño
    if (designImages && Array.isArray(designImages)) {
        if (designImages.length < 3) {
            throw new Error('Se requieren mínimo 3 imágenes de diseño');
        }
        if (designImages.length > 10) {
            throw new Error('Máximo 10 imágenes de diseño permitidas');
        }
        
        designImages.forEach(file => {
            if (file instanceof File) {
                formData.append('designImages', file);
            }
        });
    }

    return formData;
};

// Función para limpiar y validar productos
const validateAndCleanProducts = (products) => {
    if (!Array.isArray(products)) {
        console.warn('Products data is not an array:', products);
        return [];
    }

    return products.filter(product => {
        // Validaciones básicas
        if (!product || typeof product !== 'object') return false;
        if (!product._id) return false;
        if (!product.nameProduct || typeof product.nameProduct !== 'string') return false;
        
        // Filtrar productos de prueba
        const name = product.nameProduct.toLowerCase().trim();
        const isTestProduct = name.includes('prueba') || 
                            name.includes('test') || 
                            name.includes('demo') ||
                            name.includes('ejemplo');
        
        // Validar precio
        const price = parseFloat(product.price);
        const hasValidPrice = !isNaN(price) && price > 0;
        
        return !isTestProduct && hasValidPrice;
    }).map(product => ({
        ...product,
        nameProduct: product.nameProduct.trim(),
        price: parseFloat(product.price) || 0,
        description: product.description?.trim() || '',
    })).sort((a, b) => {
        // Ordenar por fecha de creación (más recientes primero)
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });
};

// Función para limpiar y validar categorías
const validateAndCleanCategories = (categories) => {
    if (!Array.isArray(categories)) {
        console.warn('Categories data is not an array:', categories);
        return [];
    }

    const validCategories = categories.filter(category => {
        if (!category || typeof category !== 'object') return false;
        if (!category._id) return false;
        if (!category.nameCategory || typeof category.nameCategory !== 'string') return false;
        
        const name = category.nameCategory.toLowerCase().trim();
        
        // Filtrar categorías de prueba
        const isTestCategory = name.includes('prueba') || 
                             name.includes('test') || 
                             name.includes('demo') ||
                             name.includes('ejemplo');
        
        const hasValidName = name.length > 0 && name.length < 100;
        
        return !isTestCategory && hasValidName;
    });

    // Remover duplicados
    const uniqueCategories = [];
    const seenNames = new Set();
    
    validCategories.forEach(category => {
        const normalizedName = category.nameCategory.toLowerCase().trim();
        if (!seenNames.has(normalizedName)) {
            seenNames.add(normalizedName);
            uniqueCategories.push({
                ...category,
                nameCategory: category.nameCategory.trim()
            });
        }
    });

    // Ordenar alfabéticamente
    return uniqueCategories.sort((a, b) => 
        a.nameCategory.localeCompare(b.nameCategory, 'es', { sensitivity: 'base' })
    );
};

// Hook principal
const useFetchProducts = () => {
    // Estados
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // Referencias para control
    const isInitialized = useRef(false);
    const abortControllerRef = useRef(null);

    // Manejo centralizado de errores
    const handleError = useCallback((error, customMessage) => {
        const message = customMessage || error.message || 'Ha ocurrido un error';
        console.error('Error:', error);
        setError(message);
        toast.error(message);
        setLoading(false);
    }, []);

    // Limpiar error
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    // Obtener todos los productos
    const getProducts = useCallback(async () => {
        try {
            setLoading(true);
            clearError();
            
            const data = await apiRequest('products');
            const cleanedProducts = validateAndCleanProducts(data);
            
            setProducts(cleanedProducts);
            console.log(`Productos cargados: ${cleanedProducts.length} de ${data.length} originales`);
            
            return cleanedProducts;
        } catch (error) {
            handleError(error, 'Error al obtener los productos');
            throw error;
        } finally {
            setLoading(false);
        }
    }, [handleError, clearError]);

    // Obtener todas las categorías
    const getCategories = useCallback(async () => {
        try {
            setLoading(true);
            clearError();
            
            const data = await apiRequest('categories');
            const cleanedCategories = validateAndCleanCategories(data);
            
            setCategories(cleanedCategories);
            console.log(`Categorías cargadas: ${cleanedCategories.length} de ${data.length} originales`);
            
            return cleanedCategories;
        } catch (error) {
            handleError(error, 'Error al obtener las categorías');
            throw error;
        } finally {
            setLoading(false);
        }
    }, [handleError, clearError]);

    // Obtener producto por ID
    const getProductById = useCallback(async (id) => {
        if (!id) throw new Error('ID del producto es requerido');
        
        try {
            setLoading(true);
            clearError();
            
            const product = await apiRequest(`products/${id}`);
            return product;
        } catch (error) {
            handleError(error, 'Error al obtener el producto');
            throw error;
        } finally {
            setLoading(false);
        }
    }, [handleError, clearError]);

    // Crear nuevo producto
    const createProduct = useCallback(async (productData) => {
        try {
            setLoading(true);
            clearError();
            
            const formData = buildFormData(productData);
            const response = await apiRequest('products', {
                method: 'POST',
                body: formData,
            });

            // Actualizar lista local
            const newProduct = response.product || response;
            setProducts(prevProducts => {
                const updatedProducts = [newProduct, ...prevProducts];
                return validateAndCleanProducts(updatedProducts);
            });
            
            toast.success('Producto creado exitosamente');
            return newProduct;
        } catch (error) {
            handleError(error, 'Error al crear el producto');
            throw error;
        } finally {
            setLoading(false);
        }
    }, [handleError, clearError]);

    // Actualizar producto
    const updateProduct = useCallback(async (id, productData) => {
        if (!id) throw new Error('ID del producto es requerido');
        
        try {
            setLoading(true);
            clearError();
            
            const formData = buildFormData(productData);
            const response = await apiRequest(`products/${id}`, {
                method: 'PUT',
                body: formData,
            });

            // Actualizar lista local
            const updatedProduct = response.product || response;
            setProducts(prevProducts => {
                const updatedProducts = prevProducts.map(product => 
                    product._id === id ? { ...product, ...updatedProduct } : product
                );
                return validateAndCleanProducts(updatedProducts);
            });
            
            toast.success('Producto actualizado exitosamente');
            return updatedProduct;
        } catch (error) {
            handleError(error, 'Error al actualizar el producto');
            throw error;
        } finally {
            setLoading(false);
        }
    }, [handleError, clearError]);

    // Eliminar producto
    const deleteProduct = useCallback(async (id) => {
        if (!id) throw new Error('ID del producto es requerido');
        
        try {
            setLoading(true);
            clearError();
            
            await apiRequest(`products/${id}`, {
                method: 'DELETE',
            });

            // Actualizar lista local
            setProducts(prevProducts => 
                prevProducts.filter(product => product._id !== id)
            );
            
            toast.success('Producto eliminado exitosamente');
        } catch (error) {
            handleError(error, 'Error al eliminar el producto');
            throw error;
        } finally {
            setLoading(false);
        }
    }, [handleError, clearError]);

    // Obtener productos por categoría
    const getProductsByCategory = useCallback(async (categoryId) => {
        if (!categoryId) throw new Error('ID de categoría es requerido');
        
        try {
            setLoading(true);
            clearError();
            
            const data = await apiRequest(`products/category/${categoryId}`);
            const cleanedProducts = validateAndCleanProducts(data);
            
            return cleanedProducts;
        } catch (error) {
            handleError(error, 'Error al obtener productos por categoría');
            throw error;
        } finally {
            setLoading(false);
        }
    }, [handleError, clearError]);

    // Buscar productos (si tienes endpoint de búsqueda)
    const searchProducts = useCallback(async (searchTerm) => {
        if (!searchTerm?.trim()) throw new Error('Término de búsqueda es requerido');
        
        try {
            setLoading(true);
            clearError();
            
            // Si no tienes endpoint de búsqueda, buscar localmente
            const filtered = products.filter(product => 
                product.nameProduct.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
            
            return filtered;
        } catch (error) {
            handleError(error, 'Error al buscar productos');
            throw error;
        } finally {
            setLoading(false);
        }
    }, [products, handleError, clearError]);

    // Funciones de filtrado memoizadas
    const productionProducts = useMemo(() => {
        return products.filter(product => {
            if (!product?.nameProduct) return false;
            const name = product.nameProduct.toLowerCase();
            return !name.includes('prueba') && !name.includes('test') && !name.includes('demo');
        });
    }, [products]);

    const productionCategories = useMemo(() => {
        return categories.filter(category => {
            if (!category?.nameCategory) return false;
            const name = category.nameCategory.toLowerCase();
            return !name.includes('prueba') && !name.includes('test') && !name.includes('demo');
        });
    }, [categories]);

    // Estadísticas memoizadas
    const stats = useMemo(() => {
        const activeProducts = products.filter(p => p?.image).length;
        const productsWithDesigns = products.filter(p => p?.designImages?.length >= 3).length;
        
        return {
            totalProducts: products.length,
            totalCategories: categories.length,
            activeProducts,
            productsWithDesigns,
            productionProducts: productionProducts.length,
            productionCategories: productionCategories.length,
        };
    }, [products, categories, productionProducts, productionCategories]);

    // Recargar todos los datos
    const refreshData = useCallback(async () => {
        try {
            clearError();
            await Promise.all([getProducts(), getCategories()]);
        } catch (error) {
            console.error('Error refreshing data:', error);
        }
    }, [getProducts, getCategories, clearError]);

    // Inicialización - Solo una vez
    useEffect(() => {
        if (!isInitialized.current) {
            isInitialized.current = true;
            refreshData();
        }

        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    return {
        // Estados
        products,
        categories,
        loading,
        error,
        
        // Datos filtrados
        productionProducts,
        productionCategories,
        stats,

        // Funciones CRUD
        getProducts,
        getCategories,
        getProductById,
        createProduct,
        updateProduct,
        deleteProduct,
        getProductsByCategory,
        searchProducts,

        // Utilidades
        refreshData,
        clearError,
        setProducts,
        setCategories,
        setLoading,
        setError,
    };
};

export default useFetchProducts;