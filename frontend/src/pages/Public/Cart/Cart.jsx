import React, { useState, useEffect, useCallback } from 'react';
import { Minus, Plus } from 'lucide-react';
import { toast } from 'react-hot-toast';
import './Cart.css';

const ShoppingCartApp = ({ onClose }) => {
  // Estados principales del carrito
  const [cartItems, setCartItems] = useState([]);
  const [currentStep, setCurrentStep] = useState('cart');
  const [paymentMethod, setPaymentMethod] = useState('transferencia');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [guestId, setGuestId] = useState(null);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [internalError, setInternalError] = useState(null);

  // Estados del formulario - CENTRALIZADO
  const [formData, setFormData] = useState({
    email: '',
    nombre: '',
    apellido: '',
    departamento: '',
    region: '',
    direccion: '',
    referencia: '',
    telefono: ''
  });

  // Estados de validación
  const [errors, setErrors] = useState({});

  // Generar ID de invitado único
  const generateGuestId = useCallback(() => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    return `guest_${timestamp}_${random}`;
  }, []);

  // FUNCIÓN MEJORADA PARA CARGAR EL CARRITO DE LOCALSTORAGE
  const loadCartFromStorage = useCallback(() => {
    try {
      console.log('📄 Cargando carrito desde localStorage...');
      
      const savedCart = localStorage.getItem('bandoggie_cart');
      console.log('📦 Carrito raw desde localStorage:', savedCart);
      
      if (!savedCart || savedCart === 'undefined' || savedCart === 'null') {
        console.log('❌ No hay carrito guardado o está vacío');
        setCartItems([]);
        return;
      }

      const parsedCart = JSON.parse(savedCart);
      console.log('📋 Carrito parseado:', parsedCart);
      
      if (!Array.isArray(parsedCart)) {
        console.log('❌ El carrito no es un array válido');
        setCartItems([]);
        return;
      }

      if (parsedCart.length === 0) {
        console.log('🔭 El carrito está vacío');
        setCartItems([]);
        return;
      }

      // Normalizar cada item del carrito para asegurar consistencia
      const normalizedCart = parsedCart.map((item, index) => {
        console.log(`🔍 Normalizando item ${index}:`, item);
        
        const normalizedItem = {
          _id: item._id || item.id || `temp_${Date.now()}_${index}`,
          id: item._id || item.id || `temp_${Date.now()}_${index}`,
          name: item.name || item.nameProduct || 'Producto Sin Nombre',
          nameProduct: item.name || item.nameProduct || 'Producto Sin Nombre',
          price: parseFloat(item.price) || 0,
          quantity: parseInt(item.quantity) || 1,
          subtotal: item.subtotal || (parseFloat(item.price) || 0) * (parseInt(item.quantity) || 1),
          talla: item.talla || null,
          color: item.color || null,
          petName: item.petName || null,
          image: item.image || (item.productInfo && item.productInfo.image) || null,
          productInfo: item.productInfo || { image: item.image || null }
        };
        
        console.log(`✅ Item normalizado ${index}:`, normalizedItem);
        return normalizedItem;
      });
      
      console.log('🛒 Carrito final normalizado:', normalizedCart);
      console.log(`📊 Total de items en el carrito: ${normalizedCart.length}`);
      
      setCartItems(normalizedCart);
      
    } catch (error) {
      console.error('❌ Error cargando carrito desde localStorage:', error);
      setCartItems([]);
      toast.error('Error al cargar el carrito');
    }
  }, []);

  // Escuchar cambios en localStorage directamente
  const handleStorageChange = useCallback((e) => {
    if (e.key === 'bandoggie_cart') {
      console.log('🔔 Evento de cambio en localStorage detectado');
      loadCartFromStorage();
    }
  }, [loadCartFromStorage]);

  // Inicializar componente
  useEffect(() => {
    console.log('🚀 Inicializando ShoppingCartApp...');
    
    try {
      setLoading(true);
      
      // Generar guest ID si no existe
      if (!guestId) {
        const newGuestId = generateGuestId();
        setGuestId(newGuestId);
        console.log('🆔 Generated guest ID:', newGuestId);
      }

      // Cargar carrito del localStorage
      loadCartFromStorage();
      
    } catch (error) {
      console.error('❌ Error initializing cart:', error);
      setInternalError('Error al inicializar el carrito');
    } finally {
      // Pequeño delay para mostrar el loading
      setTimeout(() => {
        setLoading(false);
        console.log('✅ ShoppingCartApp inicializado');
      }, 500);
    }
  }, [guestId, generateGuestId, loadCartFromStorage]);

  // Escuchar eventos de actualización del carrito
  useEffect(() => {
    const handleCartUpdate = (e) => {
      console.log('🔄 Evento cartUpdated recibido:', e);
      loadCartFromStorage();
    };

    const handleCartItemAdded = (e) => {
      console.log('➕ Evento cartItemAdded recibido:', e.detail);
      loadCartFromStorage();
    };

    // Eventos personalizados
    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('cartItemAdded', handleCartItemAdded);
    
    // Eventos del sistema
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('cartItemAdded', handleCartItemAdded);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [loadCartFromStorage, handleStorageChange]);

  // Forzar recarga del carrito cada vez que se abre el componente
  useEffect(() => {
    console.log('👀 Componente montado/actualizado, forzando recarga del carrito...');
    loadCartFromStorage();
  }, []); // Solo ejecutar una vez al montar

  // Log de cambios en cartItems para debugging
  useEffect(() => {
    console.log('🔄 cartItems actualizado:', cartItems);
    console.log(`📊 Cantidad de items: ${cartItems.length}`);
  }, [cartItems]);

  // Guardar carrito en localStorage cuando cambie (pero solo si no estamos cargando)
  useEffect(() => {
    if (loading) return; // No guardar mientras estamos cargando
    
    try {
      if (cartItems.length > 0) {
        const cartToSave = JSON.stringify(cartItems);
        localStorage.setItem('bandoggie_cart', cartToSave);
        console.log('💾 Carrito guardado en localStorage:', cartToSave);
        
        // Disparar evento para que NavBar se actualice
        window.dispatchEvent(new Event('cartUpdated'));
      } else {
        // Solo limpiar si explícitamente se vació el carrito y no estamos cargando
        if (!loading) {
          localStorage.removeItem('bandoggie_cart');
          console.log('🗑️ Carrito limpiado del localStorage');
          window.dispatchEvent(new Event('cartUpdated'));
        }
      }
    } catch (error) {
      console.error('❌ Error saving cart to localStorage:', error);
    }
  }, [cartItems, loading]);

  // Funciones de validación
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{8,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateRequired = (value) => {
    return value && value.trim().length > 0;
  };

  const validateName = (name) => {
    return name && name.trim().length >= 2;
  };

  // Manejar cambios en el formulario
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Validar formulario de checkout
  const validateCheckoutForm = () => {
    const newErrors = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Por favor ingresa un email válido';
    }

    if (!validateName(formData.nombre)) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!validateName(formData.apellido)) {
      newErrors.apellido = 'El apellido debe tener al menos 2 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validar formulario de entrega
  const validateDeliveryForm = () => {
    const newErrors = {};

    if (!validateRequired(formData.departamento)) {
      newErrors.departamento = 'Por favor selecciona un departamento';
    }

    if (!validateRequired(formData.region)) {
      newErrors.region = 'Por favor selecciona una región';
    }

    if (!validateRequired(formData.direccion)) {
      newErrors.direccion = 'La dirección es requerida';
    }

    if (!validatePhone(formData.telefono)) {
      newErrors.telefono = 'Por favor ingresa un número de teléfono válido (mínimo 8 dígitos)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Agregar producto al carrito
  const addToCart = (product, quantity = 1) => {
    try {
      setCartItems(prevItems => {
        const existingItemIndex = prevItems.findIndex(item => 
          item._id === product._id && 
          item.talla === product.talla &&
          item.color === product.color &&
          item.petName === product.petName
        );
        
        if (existingItemIndex !== -1) {
          // Si ya existe, aumentar cantidad
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex].quantity += quantity;
          updatedItems[existingItemIndex].subtotal = 
            updatedItems[existingItemIndex].quantity * updatedItems[existingItemIndex].price;
          return updatedItems;
        } else {
          // Si no existe, agregar nuevo
          const newItem = {
            _id: product._id || `temp_${Date.now()}`,
            id: product._id || `temp_${Date.now()}`,
            name: product.nameProduct || product.name || 'Producto',
            nameProduct: product.nameProduct || product.name || 'Producto',
            price: parseFloat(product.price) || 0,
            quantity: quantity,
            subtotal: (parseFloat(product.price) || 0) * quantity,
            talla: product.talla || null,
            color: product.color || null,
            petName: product.petName || null,
            image: product.image || null,
            productInfo: {
              image: product.image || null
            }
          };
          return [...prevItems, newItem];
        }
      });
      
      toast.success(`${product.nameProduct || product.name || 'Producto'} agregado al carrito`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Error al agregar al carrito');
    }
  };

  // Remover producto del carrito
  const removeFromCart = (productId) => {
    try {
      setCartItems(prevItems => {
        const newItems = prevItems.filter(item => 
          item._id !== productId && item.id !== productId
        );
        return newItems;
      });
      toast.success('Producto eliminado del carrito');
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Error al remover del carrito');
    }
  };

  // Actualizar cantidad
  const updateQuantity = (productId, quantity) => {
    try {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }

      setCartItems(prevItems =>
        prevItems.map(item => {
          if (item._id === productId || item.id === productId) {
            return {
              ...item,
              quantity: parseInt(quantity),
              subtotal: item.price * parseInt(quantity)
            };
          }
          return item;
        })
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Error al actualizar cantidad');
    }
  };

  // Limpiar carrito
  const clearCart = () => {
    if (window.confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      try {
        setCartItems([]);
        localStorage.removeItem('bandoggie_cart');
        toast.success('Carrito limpiado');
      } catch (error) {
        console.error('Error clearing cart:', error);
        toast.error('Error al limpiar carrito');
      }
    }
  };

  // Calcular totales
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 0;
      return total + (price * quantity);
    }, 0);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + (parseInt(item.quantity) || 0), 0);
  };

  const formatPrice = (price) => {
    const numPrice = parseFloat(price) || 0;
    return `$${numPrice.toFixed(2)}`;
  };

  // Función para agregar producto de ejemplo
  const addSampleProduct = () => {
    const sampleProduct = {
      _id: `sample_${Date.now()}`,
      nameProduct: `Producto de Ejemplo ${cartItems.length + 1}`,
      price: Math.floor(Math.random() * 50) + 10,
      image: null,
      talla: 'M',
      petName: null
    };
    addToCart(sampleProduct, 1);
  };

  // FUNCIÓN CORREGIDA PARA ENVIAR EMAIL BANCARIO
  const sendBankingDetailsEmail = async (orderData) => {
    try {
      // Mostrar toast de loading
      const loadingToast = toast.loading('Enviando datos bancarios...');

      console.log('📧 Enviando email bancario para:', orderData.customerInfo.email);

      // Preparar datos para el email
      const emailPayload = {
        customerName: `${orderData.customerInfo.nombre} ${orderData.customerInfo.apellido}`,
        email: orderData.customerInfo.email,
        totalAmount: orderData.total,
        orderNumber: orderData.orderNumber
      };

      console.log('📤 Payload del email:', emailPayload);

      // FIXED: URL corregida para coincidir con tu backend
      const response = await fetch('http://localhost:4000/api/email/send-simple-banking-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailPayload)
      });

      console.log('📡 Respuesta del servidor:', response.status, response.statusText);

      // Ocultar loading toast
      toast.dismiss(loadingToast);

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {
          errorData = { error: `Error HTTP ${response.status}` };
        }
        
        console.error('❌ Error del servidor:', errorData);
        throw new Error(errorData.error || `Error del servidor: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Email enviado exitosamente:', result);

      toast.success('Email con datos bancarios enviado correctamente');
      
      return { 
        success: true, 
        message: 'Email enviado correctamente',
        data: result
      };

    } catch (error) {
      console.error('❌ Error completo:', error);
      
      // Manejo específico de errores
      let errorMessage = 'Error al enviar el email con datos bancarios';
      
      if (error.message.includes('fetch')) {
        errorMessage = 'Error de conexión con el servidor';
      } else if (error.message.includes('401')) {
        errorMessage = 'Error de autenticación';
      } else if (error.message.includes('404')) {
        errorMessage = 'Servicio de email no encontrado';
      } else if (error.message.includes('500')) {
        errorMessage = 'Error interno del servidor';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
      
      return { 
        success: false, 
        error: errorMessage 
      };
    }
  };

  // Procesar compra
  const processCheckout = async () => {
    try {
      setLoading(true);
      setError(null);

      const shipping = 3.50;
      const subtotal = getCartTotal();
      const total = subtotal + shipping;

      const orderData = {
        orderNumber: `GUEST-${guestId}-${Date.now()}`,
        guestId: guestId,
        customerInfo: formData,
        items: cartItems,
        subtotal: subtotal,
        shippingCost: shipping,
        total: total,
        paymentMethod: paymentMethod,
        orderDate: new Date().toISOString(),
        status: 'pending'
      };

      // Si es transferencia, enviar email con datos bancarios
      if (paymentMethod === 'transferencia') {
        try {
          await sendBankingDetailsEmail(orderData);
        } catch (emailError) {
          console.error('Error enviando email:', emailError);
          toast.warning('Pedido creado, pero hubo un problema enviando el email. Contacta soporte.');
        }
      }

      // Limpiar carrito
      setCartItems([]);
      localStorage.removeItem('bandoggie_cart');
      
      // Ir a confirmación
      setCurrentStep('confirmation');
      toast.success('¡Pedido realizado exitosamente!');

    } catch (error) {
      console.error('Error processing checkout:', error);
      setError('Error al procesar la compra. Inténtalo de nuevo.');
      toast.error('Error al procesar la compra');
    } finally {
      setLoading(false);
    }
  };

  // Navegar entre pasos
  const nextStep = () => {
    try {
      if (currentStep === 'cart') {
        setCurrentStep('checkout');
      } else if (currentStep === 'checkout') {
        if (validateCheckoutForm()) {
          setCurrentStep('delivery');
        }
      } else if (currentStep === 'delivery') {
        if (validateDeliveryForm()) {
          setCurrentStep('payment');
        }
      } else if (currentStep === 'payment') {
        processCheckout();
      }
    } catch (error) {
      console.error('Error in nextStep:', error);
      setError('Error al avanzar al siguiente paso');
    }
  };

  // Calcular totales para mostrar
  const subtotal = getCartTotal();
  const shipping = 3.50;
  const total = subtotal + shipping;
  const hasError = error || internalError;

  // Función para agregar productos recomendados al carrito (simulado)
  const addRecommendedProduct = async (product) => {
    try {
      addToCart(product, 1);
    } catch (error) {
      console.error('Error adding recommended product:', error);
      setInternalError('Error al agregar el producto recomendado');
    }
  };

  // Productos recomendados simulados
  const recommendedProducts = [
    {
      _id: 'rec1',
      nameProduct: 'Collar Navideño',
      price: 15.99,
      image: null
    },
    {
      _id: 'rec2', 
      nameProduct: 'Bandana Especial',
      price: 12.50,
      image: null
    },
    {
      _id: 'rec3',
      nameProduct: 'Accesorio Premium',
      price: 25.00,
      image: null
    }
  ];

  // Componente de Resumen del Carrito
  const CartSummary = () => (
    <div className="cart-summary">
      <h3 className="cart-summary-title">En tu carrito</h3>
      
      {cartItems.map(item => (
        <div key={item._id || item.id} className="cart-summary-item">
          <div className="cart-summary-image">
            {item.image ? (
              <img 
                src={item.image} 
                alt={item.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
              />
            ) : (
              <div style={{ 
                width: '100%', 
                height: '100%', 
                backgroundColor: '#4169E1', 
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px'
              }}>
                📦
              </div>
            )}
          </div>
          <div className="cart-summary-details">
            <div className="cart-summary-item-name">{item.name}</div>
            {item.talla && <div className="cart-summary-specs">Talla: {item.talla}</div>}
            {item.color && <div className="cart-summary-specs">Color: {item.color}</div>}
            {item.petName && <div className="cart-summary-specs">Mascota: {item.petName}</div>}
            <div className="cart-summary-quantity">{item.quantity}x</div>
          </div>
          <div className="cart-summary-price">{formatPrice(item.subtotal)}</div>
        </div>
      ))}

      <div className="cart-summary-totals">
        <div className="cart-summary-row">
          <span className="cart-summary-label">Costo estimado de envío:</span>
          <span className="cart-summary-value">{formatPrice(shipping)}</span>
        </div>
        <div className="cart-summary-total-row">
          <span className="cart-summary-total-label">TOTAL:</span>
          <span className="cart-summary-total-value">{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );

  // Componente de productos recomendados
  const RecommendedProducts = () => {
    if (!Array.isArray(recommendedProducts) || recommendedProducts.length === 0) {
      return null;
    }

    return (
      <div className="cart-recommendations">
        <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>
          También te puede interesar:
        </h4>
        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
          {recommendedProducts.map(product => (
            <div 
              key={product._id} 
              style={{
                minWidth: '200px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                padding: '12px',
                border: '1px solid #e9ecef'
              }}
            >
              <div style={{
                width: '100%',
                height: '80px',
                backgroundColor: '#e9ecef',
                borderRadius: '4px',
                marginBottom: '8px',
                backgroundImage: product.image ? `url(${product.image})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px'
              }}>
                {!product.image && '📦'}
              </div>
              
              <h5 style={{
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '4px',
                lineHeight: '1.2'
              }}>
                {product.nameProduct || product.name || 'Producto'}
              </h5>
              
              <p style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#D2691E',
                marginBottom: '8px'
              }}>
                ${Number(product.price || 0).toFixed(2)}
              </p>

              <button
                onClick={() => addRecommendedProduct(product)}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '6px 12px',
                  fontSize: '12px',
                  backgroundColor: '#4a90a4',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  opacity: loading ? 0.6 : 1
                }}
              >
                {loading ? 'Agregando...' : 'Agregar'}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Mostrar loading mientras se carga el carrito
  if (loading) {
    return (
      <div className="cart-container">
        <div className="cart-scroll-content">
          <div className="cart-card" style={{ textAlign: 'center', padding: '40px' }}>
            <h2>Cargando carrito...</h2>
            <div style={{ 
              display: 'inline-block',
              width: '32px',
              height: '32px',
              border: '3px solid #f3f3f3',
              borderTop: '3px solid #3498db',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '20px 0'
            }}></div>
            <p style={{ color: '#666' }}>
              Cargando tus productos...
            </p>
          </div>
        </div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Mostrar error crítico si hay problemas importantes
  if (internalError && internalError.includes('crítico')) {
    return (
      <div className="cart-container">
        <div className="cart-scroll-content">
          <div className="cart-card" style={{ textAlign: 'center', padding: '40px' }}>
            <h2 style={{ color: '#dc3545' }}>Error del Sistema</h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>
              Ocurrió un error inesperado en el carrito.
            </p>
            <p style={{ fontSize: '14px', color: '#999' }}>
              Error: {internalError}
            </p>
            <button 
              className="cart-primary-button" 
              onClick={onClose}
              style={{ marginTop: '20px' }}
            >
              Cerrar carrito
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Vista de Confirmación
  if (currentStep === 'confirmation') {
    return (
      <div className="cart-container">
        <div className="cart-scroll-content">
          <div className="cart-payment-content">
            <div className="cart-green-checkmark">✓</div>
            
            <div className="cart-bandoggie-logo">
              <div className="cart-paw-print">🐾</div>
              <div className="cart-logo-text">
                <div className="cart-logo-name">BanDoggie</div>
                <div className="cart-logo-tagline">Cuidamos a tu mejor amigo</div>
              </div>
            </div>

            <h3 className="cart-confirmation-title">¡Compra realizada exitosamente!</h3>
            
            {paymentMethod === 'transferencia' ? (
              <div className="cart-final-text">
                <p>Hemos enviado los datos bancarios a tu correo electrónico <strong>{formData.email}</strong>.</p>
                <p>Una vez realices la transferencia, nos comunicaremos contigo para coordinar la entrega.</p>
                <p>¡Gracias por confiar en BanDoggie!</p>
              </div>
            ) : (
              <div className="cart-efectivo-text">
                <p>Tu pedido ha sido registrado exitosamente.</p>
                <p>El pago se realizará en efectivo al momento de la entrega.</p>
                <p>Nos comunicaremos contigo pronto para coordinar la entrega.</p>
                <p>¡Gracias por confiar en BanDoggie!</p>
              </div>
            )}

            {guestId && (
              <div style={{ 
                backgroundColor: '#f8f9fa', 
                padding: '12px', 
                borderRadius: '6px', 
                marginTop: '20px',
                fontSize: '14px',
                color: '#666'
              }}>
                <strong>Número de referencia:</strong> {guestId.slice(-8).toUpperCase()}
              </div>
            )}

            <button 
              className="cart-continue-button" 
              onClick={() => {
                onClose();
                setFormData({
                  email: '',
                  nombre: '',
                  apellido: '',
                  departamento: '',
                  region: '',
                  direccion: '',
                  referencia: '',
                  telefono: ''
                });
                setCurrentStep('cart');
                setError(null);
                setInternalError(null);
              }}
            >
              Volver al catálogo
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Vista del Carrito - CORREGIDA
  if (currentStep === 'cart') {
    console.log('🛒 Renderizando vista del carrito. Items:', cartItems.length);
    
    return (
      <div className="cart-container">
        <div className="cart-scroll-content">
          <div className="cart-step-header">
            <div className="cart-step-number">
              <span className="cart-step-number-text">1</span>
            </div>
            <h2 className="cart-step-title">Tu carrito</h2>
          </div>

          {cartItems.length === 0 ? (
            <div className="cart-card">
              <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                Tu carrito está vacío ({cartItems.length} items)
              </p>
              
              {/* Mostrar productos recomendados cuando el carrito está vacío */}
              {recommendedProducts.length > 0 && (
                <div style={{ padding: '20px' }}>
                  <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#D2691E' }}>
                    ¡Descubre nuestros productos!
                  </h3>
                  <RecommendedProducts />
                </div>
              )}
              
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <button 
                  onClick={addSampleProduct}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    marginBottom: '10px'
                  }}
                >
                  + Agregar Producto de Ejemplo
                </button>
              </div>
              
              <div className="cart-button-container">
                <button className="cart-primary-button" onClick={onClose}>
                  Ir al catálogo
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="cart-card">
                <div style={{ marginBottom: '16px', padding: '8px', backgroundColor: '#e8f5e8', borderRadius: '4px' }}>
                  <small style={{ color: '#2d5a2d' }}>
                    ✅ {cartItems.length} producto{cartItems.length !== 1 ? 's' : ''} en tu carrito
                  </small>
                </div>
                
                {cartItems.map(item => (
                  <div key={item._id || item.id} className="cart-item">
                    <div className="cart-product-image">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                        />
                      ) : (
                        <div style={{ 
                          width: '100%', 
                          height: '100%', 
                          backgroundColor: '#4169E1', 
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '32px'
                        }}>
                          📦
                        </div>
                      )}
                    </div>
                    
                    <div className="cart-product-details">
                      <div className="cart-product-label">Producto</div>
                      <div className="cart-product-name">{item.name}</div>
                      <div className="cart-product-specs">
                        {item.talla && `Talla: ${item.talla}`}
                        {item.color && ` | Color: ${item.color}`}
                        {item.petName && ` | Mascota: ${item.petName}`}
                      </div>
                    </div>

                    <div className="cart-price-section">
                      <div className="cart-section-label">Precio</div>
                      <div className="cart-price-value">{formatPrice(item.price)}</div>
                    </div>

                    <div className="cart-quantity-section">
                      <div className="cart-section-label">Cantidad</div>
                      <div className="cart-quantity-controls">
                        <button 
                          className="cart-quantity-button"
                          onClick={() => updateQuantity(item._id || item.id, item.quantity - 1)}
                          disabled={loading}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="cart-quantity-text">{item.quantity}</span>
                        <button 
                          className="cart-quantity-button"
                          onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)}
                          disabled={loading}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="cart-subtotal-section">
                      <div className="cart-section-label">Subtotal</div>
                      <div className="cart-subtotal-value">{formatPrice(item.subtotal)}</div>
                    </div>

                    <button 
                      className="cart-remove-button"
                      onClick={() => removeFromCart(item._id || item.id)}
                      disabled={loading}
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                ))}
              </div>

              <div className="cart-summary-card">
                <div className="cart-summary-content">
                  <div className="cart-summary-row">
                    <span className="cart-summary-label">Subtotal:</span>
                    <span className="cart-summary-orange-value">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="cart-summary-row">
                    <span className="cart-summary-label">Costo estimado de envío:</span>
                    <span className="cart-summary-orange-value">{formatPrice(shipping)}</span>
                  </div>
                  <div className="cart-summary-total-row">
                    <span className="cart-summary-total-label">TOTAL:</span>
                    <span className="cart-summary-total-value">{formatPrice(total)}</span>
                  </div>
                  
                  {guestId && (
                    <div style={{ marginTop: '12px', padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        Referencia: {guestId.slice(-8).toUpperCase()} | Items: {getCartItemsCount()}
                      </div>
                    </div>
                  )}
                </div>

                {hasError && (
                  <div style={{ 
                    margin: '12px 0', 
                    padding: '8px', 
                    backgroundColor: '#fee', 
                    color: '#c33', 
                    borderRadius: '4px', 
                    fontSize: '14px' 
                  }}>
                    {error || internalError}
                  </div>
                )}

                {/* Productos recomendados en carrito con items */}
                {recommendedProducts.length > 0 && !showRecommendations && (
                  <div style={{ marginTop: '16px' }}>
                    <button
                      onClick={() => setShowRecommendations(true)}
                      style={{
                        width: '100%',
                        padding: '8px',
                        backgroundColor: 'transparent',
                        border: '1px dashed #D2691E',
                        borderRadius: '6px',
                        color: '#D2691E',
                        fontSize: '14px',
                        cursor: 'pointer'
                      }}
                    >
                      ➕ Ver productos recomendados
                    </button>
                  </div>
                )}

                {showRecommendations && (
                  <div style={{ marginTop: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '600' }}>Productos recomendados:</span>
                      <button
                        onClick={() => setShowRecommendations(false)}
                        style={{
                          background: 'none',
                          border: 'none',
                          fontSize: '16px',
                          cursor: 'pointer',
                          color: '#666'
                        }}
                      >
                        ✕
                      </button>
                    </div>
                    <RecommendedProducts />
                  </div>
                )}

                <div className="cart-button-container">
                  <button className="cart-secondary-button" onClick={onClose}>
                    Regresar al catálogo
                  </button>
                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '8px' }}>
                    <button 
                      className="cart-primary-button" 
                      onClick={nextStep}
                      disabled={loading}
                    >
                      {loading ? 'Procesando...' : 'Continuar compra'}
                    </button>
                    <button
                      onClick={() => addSampleProduct()}
                      style={{
                        padding: '6px 12px',
                        fontSize: '12px',
                        backgroundColor: '#3b82f6',
                        border: 'none',
                        borderRadius: '4px',
                        color: 'white',
                        cursor: 'pointer'
                      }}
                    >
                      + Agregar Producto
                    </button>
                    <button
                      onClick={clearCart}
                      disabled={loading}
                      style={{
                        padding: '6px 12px',
                        fontSize: '12px',
                        backgroundColor: 'transparent',
                        border: '1px solid #dc3545',
                        borderRadius: '4px',
                        color: '#dc3545',
                        cursor: 'pointer'
                      }}
                    >
                      Vaciar carrito
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // Vista de Checkout
  if (currentStep === 'checkout') {
    return (
      <div className="cart-container">
        <div className="cart-scroll-content">
          <div className="cart-step-header">
            <div className="cart-step-number">
              <span className="cart-step-number-text">2</span>
            </div>
            <h2 className="cart-step-title">¿Quien hace la compra?</h2>
          </div>

          <div className="cart-checkout-container">
            <div className="cart-checkout-form">
              <div className="cart-guest-form">
                <h3 className="cart-guest-title">Ingresa como invitado</h3>
                
                <label className="cart-input-label">Email</label>
                <input
                  className={`cart-text-input ${errors.email ? 'cart-input-error' : ''}`}
                  type="email"
                  placeholder="Ingresa tu correo electrónico"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
                {errors.email && <div className="cart-error-message">{errors.email}</div>}

                <div className="cart-name-row">
                  <div className="cart-name-field">
                    <label className="cart-input-label">Nombre</label>
                    <input
                      className={`cart-text-input ${errors.nombre ? 'cart-input-error' : ''}`}
                      type="text"
                      placeholder="Ingrese sus nombres"
                      value={formData.nombre}
                      onChange={(e) => handleInputChange('nombre', e.target.value)}
                    />
                    {errors.nombre && <div className="cart-error-message">{errors.nombre}</div>}
                  </div>
                  <div className="cart-name-field">
                    <label className="cart-input-label">Apellido</label>
                    <input
                      className={`cart-text-input ${errors.apellido ? 'cart-input-error' : ''}`}
                      type="text"
                      placeholder="Ingrese sus apellidos"
                      value={formData.apellido}
                      onChange={(e) => handleInputChange('apellido', e.target.value)}
                    />
                    {errors.apellido && <div className="cart-error-message">{errors.apellido}</div>}
                  </div>
                </div>

                <button 
                  className="cart-continue-button" 
                  onClick={nextStep}
                  disabled={loading}
                >
                  {loading ? 'Procesando...' : 'Continuar'}
                </button>

                <div className="cart-login-prompt">
                  <span className="cart-login-prompt-text">¿Ya tienes una cuenta? </span>
                  <button 
                    className="cart-login-button"
                    type="button"
                    onClick={() => {
                      onClose();
                      window.dispatchEvent(new CustomEvent('openLoginModal'));
                      toast.success('Cerrando carrito para iniciar sesión...');
                    }}
                  >
                    Inicia Sesión
                  </button>
                </div>
              </div>
            </div>

            <CartSummary />
          </div>

          <button className="cart-back-link" onClick={() => setCurrentStep('cart')}>
            Regresar al carrito
          </button>
        </div>
      </div>
    );
  }

  // Vista de Entrega
  if (currentStep === 'delivery') {
    return (
      <div className="cart-container">
        <div className="cart-scroll-content">
          <div className="cart-step-header">
            <div className="cart-step-number">
              <span className="cart-step-number-text">3</span>
            </div>
            <h2 className="cart-step-title">¿A donde enviamos tu orden?</h2>
          </div>

          <div className="cart-checkout-container">
            <div className="cart-delivery-form">
              <label className="cart-country-label">País</label>
              <div className="cart-country-value">El Salvador</div>

              <div className="cart-select-row">
                <div className="cart-select-field">
                  <label className="cart-input-label">Departamento *</label>
                  <select 
                    className={`cart-select-input ${errors.departamento ? 'cart-input-error' : ''}`}
                    value={formData.departamento}
                    onChange={(e) => handleInputChange('departamento', e.target.value)}
                  >
                    <option value="">Seleccionar departamento</option>
                    <option value="san-salvador">San Salvador</option>
                    <option value="la-libertad">La Libertad</option>
                    <option value="santa-ana">Santa Ana</option>
                    <option value="sonsonate">Sonsonate</option>
                    <option value="ahuachapan">Ahuachapán</option>
                  </select>
                  {errors.departamento && <div className="cart-error-message">{errors.departamento}</div>}
                </div>
                <div className="cart-select-field">
                  <label className="cart-input-label">Región *</label>
                  <select 
                    className={`cart-select-input ${errors.region ? 'cart-input-error' : ''}`}
                    value={formData.region}
                    onChange={(e) => handleInputChange('region', e.target.value)}
                  >
                    <option value="">Seleccionar región</option>
                    <option value="san-salvador">San Salvador</option>
                    <option value="mejicanos">Mejicanos</option>
                    <option value="soyapango">Soyapango</option>
                    <option value="ciudad-delgado">Ciudad Delgado</option>
                  </select>
                  {errors.region && <div className="cart-error-message">{errors.region}</div>}
                </div>
              </div>

              <label className="cart-input-label">Dirección de entrega *</label>
              <input
                className={`cart-text-input ${errors.direccion ? 'cart-input-error' : ''}`}
                type="text"
                placeholder="Ingresa tu dirección completa"
                value={formData.direccion}
                onChange={(e) => handleInputChange('direccion', e.target.value)}
              />
              {errors.direccion && <div className="cart-error-message">{errors.direccion}</div>}

              <label className="cart-input-label">Punto de referencia</label>
              <input
                className="cart-text-input"
                type="text"
                placeholder="Puntos de referencia cercanos"
                value={formData.referencia}
                onChange={(e) => handleInputChange('referencia', e.target.value)}
              />

              <div className="cart-name-row">
                <div className="cart-name-field">
                  <label className="cart-input-label">Nombre</label>
                  <input
                    className={`cart-text-input ${errors.nombre ? 'cart-input-error' : ''}`}
                    type="text"
                    placeholder="Tu nombre"
                    value={formData.nombre}
                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                  />
                  {errors.nombre && <div className="cart-error-message">{errors.nombre}</div>}
                </div>
                <div className="cart-name-field">
                  <label className="cart-input-label">Apellidos</label>
                  <input
                    className={`cart-text-input ${errors.apellido ? 'cart-input-error' : ''}`}
                    type="text"
                    placeholder="Tus apellidos"
                    value={formData.apellido}
                    onChange={(e) => handleInputChange('apellido', e.target.value)}
                  />
                  {errors.apellido && <div className="cart-error-message">{errors.apellido}</div>}
                </div>
              </div>

              <label className="cart-input-label">Teléfono de contacto *</label>
              <input
                className={`cart-text-input ${errors.telefono ? 'cart-input-error' : ''}`}
                type="tel"
                placeholder="Número de teléfono"
                value={formData.telefono}
                onChange={(e) => handleInputChange('telefono', e.target.value)}
              />
              {errors.telefono && <div className="cart-error-message">{errors.telefono}</div>}

              <div className="cart-note-container">
                <div className="cart-note-text">
                  <span className="cart-note-bold">NOTA:</span> Las entregas son realizadas por encomiendas, nos comunicaremos contigo sobre los detalles de tu envío.
                </div>
              </div>

              <button 
                className="cart-continue-button" 
                onClick={nextStep}
                disabled={loading}
              >
                {loading ? 'Procesando...' : 'Continuar a pago'}
              </button>
            </div>

            <CartSummary />
          </div>

          <button className="cart-back-link" onClick={() => setCurrentStep('checkout')}>
            Regresar
          </button>
        </div>
      </div>
    );
  }

  // Vista de Pago
  if (currentStep === 'payment') {
    return (
      <div className="cart-container">
        <div className="cart-scroll-content">
          <div className="cart-step-header">
            <div className="cart-step-number">
              <span className="cart-step-number-text">4</span>
            </div>
            <h2 className="cart-step-title">Métodos de pago</h2>
          </div>

          <div className="cart-checkout-container">
            <div className="cart-payment-form">
              <div className="cart-payment-toggle">
                <button 
                  className="cart-toggle-button"
                  style={{
                    backgroundColor: paymentMethod === 'transferencia' ? 'white' : 'transparent',
                    color: paymentMethod === 'transferencia' ? '#4a90a4' : 'white'
                  }}
                  onClick={() => setPaymentMethod('transferencia')}
                >
                  Transferencia
                </button>
                <button 
                  className="cart-toggle-button"
                  style={{
                    backgroundColor: paymentMethod === 'efectivo' ? 'white' : 'transparent',
                    color: paymentMethod === 'efectivo' ? '#4a90a4' : 'white'
                  }}
                  onClick={() => setPaymentMethod('efectivo')}
                >
                  Efectivo
                </button>
              </div>

              {paymentMethod === 'transferencia' ? (
                <div className="cart-payment-content">
                  <div className="cart-green-checkmark">✓</div>
                  <h3 className="cart-confirmation-title">Confirmación de pedido</h3>
                  <p className="cart-confirmation-text">
                    ¿Estás seguro de que deseas continuar con tu compra? Te enviaremos a tu correo los datos para realizar la transferencia. ¿Quieres continuar?
                  </p>
                  <button 
                    className="cart-continue-button" 
                    onClick={nextStep}
                    disabled={loading}
                  >
                    {loading ? 'Procesando...' : 'Finalizar compra'}
                  </button>
                </div>
              ) : (
                <div className="cart-payment-content">
                  <p className="cart-efectivo-text">
                    ¡Gracias por tu compra! El pago se realizará en efectivo al momento de la entrega de tu producto.
                  </p>
                  <button 
                    className="cart-continue-button" 
                    onClick={nextStep}
                    disabled={loading}
                  >
                    {loading ? 'Procesando...' : 'Finalizar compra'}
                  </button>
                </div>
              )}

              {hasError && (
                <div style={{ 
                  margin: '16px 0', 
                  padding: '12px', 
                  backgroundColor: '#fee2e2', 
                  color: '#dc2626', 
                  borderRadius: '6px', 
                  fontSize: '14px',
                  textAlign: 'center'
                }}>
                  {error || internalError}
                </div>
              )}
            </div>

            <CartSummary />
          </div>

          <button className="cart-back-link" onClick={() => setCurrentStep('delivery')}>
            Regresar
          </button>
        </div>
      </div>
    );
  }

  // Fallback - mostrar vista del carrito
  return (
    <div className="cart-container">
      <div className="cart-scroll-content">
        <div className="cart-card">
          <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            Cargando carrito...
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartApp;