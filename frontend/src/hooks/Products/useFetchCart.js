import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { API_FETCH_JSON } from '../../config';

const useFetchCart = () => {
  // Estados principales
  const [cart, setCart] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [guestId, setGuestId] = useState(null);

  // Endpoints
  const cartEndpoint = 'cart';
  const orderEndpoint = 'orders';

  // Generar o recuperar guest ID (sin localStorage)
  const getOrCreateGuestId = useCallback(() => {
    if (!guestId) {
      const newGuestId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setGuestId(newGuestId);
      return newGuestId;
    }
    return guestId;
  }, [guestId]);

  // Cargar carrito inicial (solo memoria)
  const loadCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const currentGuestId = getOrCreateGuestId();
      
      // Crear carrito vacío inicial si no existe
      if (!cart) {
        const initialCart = {
          products: [],
          guestId: currentGuestId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        setCart(initialCart);
        setCartProducts([]);
      }

      // Opcional: Intentar cargar desde servidor
      try {
        const serverCart = await API_FETCH_JSON(`${cartEndpoint}/${currentGuestId}`);
        if (serverCart && serverCart.products) {
          setCart(serverCart);
          setCartProducts(serverCart.products);
        }
      } catch (serverError) {
        // Si no existe en servidor, usar carrito en memoria
        console.log('Cart not found on server, using memory cart');
      }

    } catch (error) {
      console.error('Error loading cart:', error);
      setError('Error al cargar el carrito');
      
      // Crear carrito de emergencia
      const emergencyCart = {
        products: [],
        guestId: getOrCreateGuestId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setCart(emergencyCart);
      setCartProducts([]);
    } finally {
      setLoading(false);
    }
  }, [cart, getOrCreateGuestId]);

  // Guardar carrito (solo memoria y opcional servidor)
  const saveCart = useCallback(async (cartData) => {
    try {
      // Actualizar estado inmediatamente
      setCart(cartData);
      setCartProducts(cartData.products || []);
      
      // Opcional: Intentar guardar en servidor
      try {
        await API_FETCH_JSON(`${cartEndpoint}/${cartData.guestId}`, {
          method: 'PUT',
          body: cartData
        });
      } catch (serverError) {
        console.log('Could not sync with server, using memory only');
      }
      
    } catch (error) {
      console.error('Error saving cart:', error);
      throw error;
    }
  }, []);

  // Agregar producto al carrito
  const handleAddProduct = useCallback(async (productData) => {
    try {
      setLoading(true);
      setError(null);

      const currentGuestId = getOrCreateGuestId();
      const currentCart = cart || { 
        products: [], 
        guestId: currentGuestId,
        createdAt: new Date().toISOString()
      };
      
      const newProducts = [...(currentCart.products || [])];

      // Buscar si el producto ya existe
      const existingProductIndex = newProducts.findIndex(item => 
        item.idProduct === productData.idProduct &&
        (item.talla || null) === (productData.talla || null) &&
        (item.color || null) === (productData.color || null) &&
        (item.petName || null) === (productData.petName || null)
      );

      if (existingProductIndex !== -1) {
        // Actualizar cantidad si ya existe
        newProducts[existingProductIndex].quantity += (productData.quantity || 1);
        newProducts[existingProductIndex].subtotal = 
          newProducts[existingProductIndex].quantity * newProducts[existingProductIndex].price;
      } else {
        // Agregar nuevo producto
        const newProduct = {
          id: `${productData.idProduct}_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
          idProduct: productData.idProduct,
          name: productData.name || 'Producto',
          price: parseFloat(productData.price) || 0,
          quantity: parseInt(productData.quantity) || 1,
          talla: productData.talla || null,
          color: productData.color || null,
          petName: productData.petName || null,
          subtotal: (parseFloat(productData.price) || 0) * (parseInt(productData.quantity) || 1),
          productInfo: {
            image: productData.image || null
          },
          addedAt: new Date().toISOString()
        };
        newProducts.push(newProduct);
      }

      const updatedCart = {
        ...currentCart,
        products: newProducts,
        updatedAt: new Date().toISOString()
      };

      await saveCart(updatedCart);
      toast.success(`${productData.name || 'Producto'} agregado al carrito`);
      
      return updatedCart;

    } catch (error) {
      const errorMessage = 'Error al agregar producto al carrito';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Error in handleAddProduct:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [cart, saveCart, getOrCreateGuestId]);

  // Remover producto del carrito
  const handleRemoveProduct = useCallback(async (productId) => {
    try {
      setLoading(true);
      setError(null);

      if (!cart || !cart.products || cart.products.length === 0) {
        throw new Error('Carrito vacío');
      }

      const newProducts = cart.products.filter(item => item.id !== productId);
      
      const updatedCart = {
        ...cart,
        products: newProducts,
        updatedAt: new Date().toISOString()
      };

      await saveCart(updatedCart);
      toast.success('Producto eliminado del carrito');
      
      return updatedCart;

    } catch (error) {
      const errorMessage = 'Error al eliminar producto del carrito';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Error in handleRemoveProduct:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [cart, saveCart]);

  // Actualizar cantidad de producto
  const handleUpdateProductQuantity = useCallback(async (productId, newQuantity) => {
    try {
      setLoading(true);
      setError(null);

      if (!cart || !cart.products) {
        throw new Error('Carrito vacío');
      }

      if (newQuantity <= 0) {
        return await handleRemoveProduct(productId);
      }

      const newProducts = cart.products.map(item => {
        if (item.id === productId) {
          return {
            ...item,
            quantity: parseInt(newQuantity),
            subtotal: item.price * parseInt(newQuantity)
          };
        }
        return item;
      });

      const updatedCart = {
        ...cart,
        products: newProducts,
        updatedAt: new Date().toISOString()
      };

      await saveCart(updatedCart);
      
      return updatedCart;

    } catch (error) {
      const errorMessage = 'Error al actualizar cantidad';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Error in handleUpdateProductQuantity:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [cart, saveCart, handleRemoveProduct]);

  // Vaciar carrito
  const handleClearCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const currentGuestId = getOrCreateGuestId();
      const emptyCart = {
        products: [],
        guestId: currentGuestId,
        clearedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await saveCart(emptyCart);
      toast.success('Carrito vaciado');
      
      return emptyCart;

    } catch (error) {
      const errorMessage = 'Error al vaciar carrito';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Error in handleClearCart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [saveCart, getOrCreateGuestId]);

  // Procesar checkout como invitado
  const handleGuestCheckout = useCallback(async (orderData) => {
    try {
      setLoading(true);
      setError(null);

      if (!cart || !cart.products || cart.products.length === 0) {
        throw new Error('El carrito está vacío');
      }

      const summary = getCartSummary();

      // Preparar datos de la orden
      const orderPayload = {
        guestId: guestId || getOrCreateGuestId(),
        customerInfo: orderData.customerInfo,
        deliveryInfo: orderData.deliveryInfo,
        paymentMethod: orderData.paymentMethod,
        items: cart.products.map(item => ({
          productId: item.idProduct,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          subtotal: item.subtotal,
          customizations: {
            talla: item.talla,
            color: item.color,
            petName: item.petName
          }
        })),
        summary: summary,
        total: orderData.total || summary.totalPrice,
        shippingCost: orderData.shippingCost || 0,
        orderDate: new Date().toISOString(),
        status: 'pending'
      };

      // Enviar orden al servidor
      const response = await API_FETCH_JSON(orderEndpoint, {
        method: 'POST',
        body: orderPayload
      });

      // Limpiar carrito después de checkout exitoso
      await handleClearCart();
      
      toast.success('¡Pedido realizado exitosamente!');
      
      return response;

    } catch (error) {
      const errorMessage = 'Error al procesar la compra';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Error in handleGuestCheckout:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [cart, guestId, getOrCreateGuestId, handleClearCart]);

  // Obtener resumen del carrito
  const getCartSummary = useCallback(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      return {
        itemCount: 0,
        totalPrice: 0,
        isEmpty: true,
        products: []
      };
    }

    try {
      const itemCount = cart.products.reduce((total, item) => {
        return total + (parseInt(item.quantity) || 0);
      }, 0);
      
      const totalPrice = cart.products.reduce((total, item) => {
        return total + (parseFloat(item.subtotal) || 0);
      }, 0);

      return {
        itemCount,
        totalPrice: parseFloat(totalPrice.toFixed(2)),
        isEmpty: itemCount === 0,
        products: cart.products
      };
    } catch (error) {
      console.error('Error calculating cart summary:', error);
      return {
        itemCount: 0,
        totalPrice: 0,
        isEmpty: true,
        products: []
      };
    }
  }, [cart]);

  // Verificar si un producto está en el carrito
  const isProductInCart = useCallback((productId, talla = null, color = null) => {
    if (!cart || !cart.products || !Array.isArray(cart.products)) return false;
    
    try {
      return cart.products.some(item => 
        item.idProduct === productId &&
        (item.talla || null) === (talla || null) &&
        (item.color || null) === (color || null)
      );
    } catch (error) {
      console.error('Error checking if product in cart:', error);
      return false;
    }
  }, [cart]);

  // Obtener cantidad de un producto en el carrito
  const getProductQuantity = useCallback((productId, talla = null, color = null) => {
    if (!cart || !cart.products || !Array.isArray(cart.products)) return 0;
    
    try {
      const product = cart.products.find(item => 
        item.idProduct === productId &&
        (item.talla || null) === (talla || null) &&
        (item.color || null) === (color || null)
      );
      
      return product ? (parseInt(product.quantity) || 0) : 0;
    } catch (error) {
      console.error('Error getting product quantity:', error);
      return 0;
    }
  }, [cart]);

  // Obtener producto específico del carrito
  const getCartProduct = useCallback((productId, talla = null, color = null) => {
    if (!cart || !cart.products || !Array.isArray(cart.products)) return null;
    
    try {
      return cart.products.find(item => 
        item.idProduct === productId &&
        (item.talla || null) === (talla || null) &&
        (item.color || null) === (color || null)
      ) || null;
    } catch (error) {
      console.error('Error getting cart product:', error);
      return null;
    }
  }, [cart]);

  // Sincronizar con servidor
  const syncWithServer = useCallback(async () => {
    if (!guestId) return;

    try {
      const serverCart = await API_FETCH_JSON(`${cartEndpoint}/${guestId}`);
      if (serverCart && serverCart.products) {
        setCart(serverCart);
        setCartProducts(serverCart.products);
      }
    } catch (error) {
      console.log('Could not sync with server');
    }
  }, [guestId]);

  // Inicializar carrito al montar el hook
  useEffect(() => {
    if (!cart) {
      loadCart();
    }
  }, [cart, loadCart]);

  // Crear guest ID si no existe
  useEffect(() => {
    if (!guestId) {
      getOrCreateGuestId();
    }
  }, [guestId, getOrCreateGuestId]);

  return {
    // Estados
    cart,
    cartProducts,
    loading,
    error,
    guestId,

    // Funciones principales
    handleAddProduct,
    handleRemoveProduct,
    handleUpdateProductQuantity,
    handleClearCart,
    handleGuestCheckout,

    // Funciones de consulta
    getCartSummary,
    isProductInCart,
    getProductQuantity,
    getCartProduct,

    // Funciones de utilidad
    loadCart,
    saveCart,
    syncWithServer,

    // Setters (para casos especiales)
    setCart,
    setCartProducts,
    setError,
    setLoading
  };
};

export default useFetchCart;