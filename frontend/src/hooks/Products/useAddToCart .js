import { useState } from 'react';
import useFetchCart from './useFetchCart';

const useAddToCart = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const {
    handleAddProduct,
    getCartSummary,
    isProductInCart,
    getProductQuantity
  } = useFetchCart();

  // Función principal para agregar productos al carrito
  const addToCart = async (productData, options = {}) => {
    try {
      setLoading(true);
      setError(null);

      // Validar datos del producto
      if (!productData.idProduct && !productData._id) {
        throw new Error('ID del producto es requerido');
      }
      
      if (!productData.price) {
        throw new Error('Precio del producto es requerido');
      }

      // Preparar datos del producto para el carrito
      const cartProductData = {
        idProduct: productData.idProduct || productData._id,
        name: productData.nameProduct || productData.name,
        price: parseFloat(productData.price),
        quantity: options.quantity || 1,
        talla: options.talla || null,
        color: options.color || null,
        petName: options.petName || null,
        image: productData.image || null,
        // Calcular subtotal
        subtotal: parseFloat(productData.price) * (options.quantity || 1)
      };

      // Agregar al carrito usando el hook del carrito
      const result = await handleAddProduct(cartProductData);
      
      return {
        success: true,
        cart: result,
        message: 'Producto agregado al carrito correctamente'
      };

    } catch (error) {
      const errorMessage = error.message || 'Error al agregar producto al carrito';
      setError(errorMessage);
      
      return {
        success: false,
        error: errorMessage,
        message: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  // Función para agregar múltiples productos
  const addMultipleToCart = async (productsArray) => {
    try {
      setLoading(true);
      setError(null);

      const results = [];
      
      for (const productData of productsArray) {
        const result = await addToCart(productData.product, productData.options);
        results.push(result);
        
        // Si alguno falla, detener el proceso
        if (!result.success) {
          throw new Error(`Error en producto ${productData.product.name}: ${result.error}`);
        }
      }

      return {
        success: true,
        results,
        message: `${results.length} productos agregados al carrito`
      };

    } catch (error) {
      const errorMessage = error.message || 'Error al agregar productos al carrito';
      setError(errorMessage);
      
      return {
        success: false,
        error: errorMessage,
        message: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  // Función para verificar disponibilidad antes de agregar
  const checkAndAddToCart = async (productData, options = {}) => {
    try {
      // Verificar si el producto ya está en el carrito
      const currentQuantity = getProductQuantity(
        productData.idProduct || productData._id,
        options.talla,
        options.color
      );

      const newQuantity = currentQuantity + (options.quantity || 1);

      // Verificar límite máximo
      if (newQuantity > 5) {
        throw new Error(`No puedes agregar más de 5 unidades del mismo producto. Actualmente tienes ${currentQuantity}.`);
      }

      // Verificar stock si está disponible
      if (productData.stock !== undefined && productData.stock < newQuantity) {
        throw new Error(`Stock insuficiente. Disponible: ${productData.stock}, solicitado: ${newQuantity}`);
      }

      // Si todo está bien, agregar al carrito
      return await addToCart(productData, options);

    } catch (error) {
      const errorMessage = error.message || 'Error al verificar producto';
      setError(errorMessage);
      
      return {
        success: false,
        error: errorMessage,
        message: errorMessage
      };
    }
  };

  // Función para agregar con configuraciones personalizadas
  const addWithCustomization = async (productData, customizations = {}) => {
    try {
      const {
        talla,
        color,
        petName,
        quantity = 1,
        notes
      } = customizations;

      // Validar personalizaciones
      if (talla) {
        const validSizes = ['XS', 'S', 'M', 'L', 'XL'];
        if (!validSizes.includes(talla)) {
          throw new Error(`Talla inválida. Tallas disponibles: ${validSizes.join(', ')}`);
        }
      }

      const options = {
        quantity,
        talla,
        color,
        petName,
        notes
      };

      return await checkAndAddToCart(productData, options);

    } catch (error) {
      const errorMessage = error.message || 'Error en personalización';
      setError(errorMessage);
      
      return {
        success: false,
        error: errorMessage,
        message: errorMessage
      };
    }
  };

  // Función rápida para agregar con cantidad específica
  const quickAdd = async (productData, quantity = 1) => {
    return await addToCart(productData, { quantity });
  };

  // Función para obtener información del producto en el carrito
  const getProductInCart = (productId, talla = null, color = null) => {
    const inCart = isProductInCart(productId, talla, color);
    const quantity = getProductQuantity(productId, talla, color);
    
    return {
      inCart,
      quantity,
      canAddMore: quantity < 5
    };
  };

  // Función para calcular precio total antes de agregar
  const calculateTotalPrice = (productData, quantity = 1) => {
    const price = parseFloat(productData.price);
    const subtotal = price * quantity;
    const currentTotal = getCartSummary().totalPrice || 0;
    const newTotal = currentTotal + subtotal;
    
    return {
      itemPrice: price,
      itemSubtotal: subtotal,
      currentCartTotal: currentTotal,
      newCartTotal: newTotal
    };
  };

  // Función para obtener recomendaciones basadas en el carrito
  const getRecommendations = (allProducts = []) => {
    const summary = getCartSummary();
    
    if (summary.isEmpty || !summary.itemCount) {
      // Si el carrito está vacío, devolver productos populares o aleatorios
      return allProducts.slice(0, 4);
    }

    // Lógica simple de recomendaciones basada en categorías del carrito
    // Esto se puede expandir con algoritmos más sofisticados
    return allProducts
      .filter(product => {
        const productId = product._id || product.idProduct;
        return !isProductInCart(productId);
      })
      .slice(0, 4);
  };

  // Función para validar producto antes de mostrar botón "Agregar"
  const canAddProduct = (productData, quantity = 1, talla = null, color = null) => {
    try {
      // Verificar datos básicos
      if (!productData || !productData.price) {
        return { canAdd: false, reason: 'Producto no válido' };
      }

      // Verificar si tiene ID
      if (!productData.idProduct && !productData._id) {
        return { canAdd: false, reason: 'Producto sin ID' };
      }

      // Verificar cantidad en carrito
      const currentQuantity = getProductQuantity(
        productData.idProduct || productData._id,
        talla,
        color
      );

      if (currentQuantity + quantity > 5) {
        return { 
          canAdd: false, 
          reason: `Límite máximo alcanzado (${currentQuantity}/5)` 
        };
      }

      // Verificar stock
      if (productData.stock !== undefined && productData.stock < quantity) {
        return { 
          canAdd: false, 
          reason: `Stock insuficiente (${productData.stock} disponibles)` 
        };
      }

      // Verificar si el producto está activo
      if (productData.isActive === false) {
        return { 
          canAdd: false, 
          reason: 'Producto no disponible' 
        };
      }

      return { canAdd: true, reason: null };

    } catch (error) {
      return { 
        canAdd: false, 
        reason: 'Error al validar producto' 
      };
    }
  };

  // Limpiar errores
  const clearError = () => {
    setError(null);
  };

  return {
    // Estados
    loading,
    error,

    // Funciones principales
    addToCart,
    addMultipleToCart,
    checkAndAddToCart,
    addWithCustomization,
    quickAdd,

    // Funciones de utilidad
    getProductInCart,
    calculateTotalPrice,
    getRecommendations,
    canAddProduct,

    // Funciones del carrito (re-exportadas para conveniencia)
    getCartSummary,
    isProductInCart,
    getProductQuantity,

    // Utilidades
    clearError
  };
};

export default useAddToCart;