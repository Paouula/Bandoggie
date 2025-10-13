import React, { useState, useEffect, useCallback } from 'react';
import { Minus, Plus } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../../context/AuthContext';
import './Cart.css';

const ShoppingCartApp = ({ onClose }) => {
  const { user, isAuthenticated } = useAuth();

  // Estados principales
  const [cartItems, setCartItems] = useState([]);
  const [currentStep, setCurrentStep] = useState('cart');
  const [paymentMethod, setPaymentMethod] = useState('transferencia');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [guestId, setGuestId] = useState(null);
  const [internalError, setInternalError] = useState(null);

  // Estados del formulario
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

  // Llenar datos del formulario si hay usuario autenticado
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log('✅ Usuario autenticado detectado:', user);
      setFormData(prev => ({
        ...prev,
        email: user.email || prev.email,
        nombre: user.name?.split(' ')[0] || prev.nombre,
        apellido: user.name?.split(' ').slice(1).join(' ') || prev.apellido,
        telefono: user.phone || prev.telefono,
        direccion: user.address || prev.direccion
      }));
    }
  }, [isAuthenticated, user]);

  // Generar ID de invitado
  const generateGuestId = useCallback(() => {
    // Generar un ObjectId válido de MongoDB (24 caracteres hexadecimales)
    const timestamp = Math.floor(Date.now() / 1000).toString(16).padStart(8, '0');
    const machineId = Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0');
    const processId = Math.floor(Math.random() * 65536).toString(16).padStart(4, '0');
    const counter = Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0');
    return `${timestamp}${machineId}${processId}${counter}`;
  }, []);

  // Cargar carrito desde localStorage
  const loadCartFromStorage = useCallback(() => {
    try {
      console.log('📄 Cargando carrito...');
      
      const savedCart = localStorage.getItem('bandoggie_cart');
      
      if (!savedCart || savedCart === 'undefined' || savedCart === 'null') {
        setCartItems([]);
        return;
      }

      const parsedCart = JSON.parse(savedCart);
      
      if (!Array.isArray(parsedCart) || parsedCart.length === 0) {
        setCartItems([]);
        return;
      }

      const normalizedCart = parsedCart.map((item, index) => ({
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
      }));
      
      setCartItems(normalizedCart);
      
    } catch (error) {
      console.error('❌ Error cargando carrito:', error);
      setCartItems([]);
      toast.error('Error al cargar el carrito');
    }
  }, []);

  // Escuchar cambios en localStorage
  const handleStorageChange = useCallback((e) => {
    if (e.key === 'bandoggie_cart') {
      loadCartFromStorage();
    }
  }, [loadCartFromStorage]);

  // Inicializar componente
  useEffect(() => {
    console.log('🚀 Inicializando carrito...');
    
    const initCart = async () => {
      try {
        setLoading(true);
        
        // Generar guestId solo una vez
        if (!guestId) {
          const newGuestId = generateGuestId();
          setGuestId(newGuestId);
          console.log('🆔 Guest ID generado:', newGuestId);
        }

        loadCartFromStorage();
        
      } catch (error) {
        console.error('❌ Error inicializando:', error);
        setInternalError('Error al inicializar el carrito');
      } finally {
        setTimeout(() => setLoading(false), 300);
      }
    };

    initCart();
  }, []); // ✅ Solo ejecutar una vez al montar

  // Escuchar eventos
  useEffect(() => {
    const handleCartUpdate = () => loadCartFromStorage();
    const handleCartItemAdded = () => loadCartFromStorage();

    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('cartItemAdded', handleCartItemAdded);
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('cartItemAdded', handleCartItemAdded);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [loadCartFromStorage, handleStorageChange]);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    if (loading) return;
    
    const saveCart = () => {
      try {
        if (cartItems.length > 0) {
          localStorage.setItem('bandoggie_cart', JSON.stringify(cartItems));
          window.dispatchEvent(new Event('cartUpdated'));
        } else {
          localStorage.removeItem('bandoggie_cart');
          window.dispatchEvent(new Event('cartUpdated'));
        }
      } catch (error) {
        console.error('❌ Error guardando carrito:', error);
      }
    };

    saveCart();
  }, [cartItems]); // ✅ Solo cuando cartItems cambie, no loading

  // Funciones de validación
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
  const validatePhone = (phone) => {
    // Limpiar el teléfono de espacios y guiones
    const cleanPhone = phone.replace(/[\s-]/g, '');
    // Validar que tenga exactamente 8 dígitos
    return /^[0-9]{8}$/.test(cleanPhone);
  };
  
  const formatPhoneNumber = (value) => {
    // Remover todo excepto números
    const numbers = value.replace(/[^\d]/g, '');
    
    // Limitar a 8 dígitos
    const limited = numbers.slice(0, 8);
    
    // Formatear como XXXX-XXXX si tiene más de 4 dígitos
    if (limited.length > 4) {
      return `${limited.slice(0, 4)}-${limited.slice(4)}`;
    }
    
    return limited;
  };
  
  const validateRequired = (value) => value && value.trim().length > 0;
  const validateName = (name) => name && name.trim().length >= 2;

  // Manejar cambios en el formulario
  const handleInputChange = (field, value) => {
    // Si es el campo de teléfono, aplicar formato automático
    if (field === 'telefono') {
      value = formatPhoneNumber(value);
    }
    
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
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
      newErrors.telefono = 'El teléfono debe tener exactamente 8 dígitos (formato: XXXX-XXXX)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // CREAR CARRITO EN LA BASE DE DATOS
  const createCartInDatabase = async () => {
    try {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('💾 CREANDO CARRITO EN LA BASE DE DATOS');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      
      if (!cartItems || cartItems.length === 0) {
        throw new Error('No hay productos en el carrito');
      }

      // Preparar productos - SOLO agregar talla si existe
      const products = cartItems.map(item => {
        const product = {
          idProduct: item._id || item.id,
          quantity: parseInt(item.quantity),
          subtotal: parseFloat(item.subtotal)
        };
        
        // Solo agregar talla si existe y no es null
        if (item.talla && item.talla !== null && item.talla !== 'null') {
          product.talla = item.talla;
        }
        
        return product;
      });

      const cartData = {
        products: products,
        total: parseFloat((getCartTotal() + 3.50).toFixed(2)),
        status: 'Pending'
      };

      // ✅ SOLO agregar idClient si está autenticado con un ID real
      if (isAuthenticated && user?._id) {
        cartData.idClient = user._id;
        console.log('👤 Usuario registrado:', user._id);
      } else {
        // ⚠️ NO ENVIAR idClient para invitados
        // El backend debe manejarlo como null
        console.log('👤 Compra como invitado - SIN idClient');
      }

      console.log('📤 PAYLOAD DEL CARRITO:');
      console.log(JSON.stringify(cartData, null, 2));
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

      const response = await fetch('https://bandoggie-production.up.railway.app/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cartData)
      });

      console.log('📡 Status:', response.status);

      if (!response.ok) {
        const responseText = await response.text();
        console.log('📄 Respuesta del servidor:', responseText);
        
        let errorData;
        try {
          errorData = JSON.parse(responseText);
        } catch (e) {
          errorData = { message: responseText || `Error ${response.status}` };
        }
        
        console.error('❌ ERROR:', JSON.stringify(errorData, null, 2));
        
        // Si el error es por falta de idClient, mostrar mensaje específico
        if (errorData.message && errorData.message.includes('cliente')) {
          throw new Error('Por favor inicia sesión para completar la compra o contacta soporte');
        }
        
        throw new Error(errorData.message || `Error ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Carrito creado:', result.cart._id);
      
      return result.cart._id;
      
    } catch (error) {
      console.error('❌ Error creando carrito:', error.message);
      throw error;
    }
  };

  // CREAR ORDEN
  const createOrderInDatabase = async (cartId) => {
    try {
      const fullAddress = `${formData.direccion}, ${formData.region}, ${formData.departamento}${formData.referencia ? ` (Ref: ${formData.referencia})` : ''}`;
      
      const orderData = {
        idCart: cartId,
        addressClient: fullAddress,
        PaymentMethod: paymentMethod.toLowerCase(),
        customerEmail: formData.email,
        customerName: `${formData.nombre} ${formData.apellido}`,
        customerPhone: formData.telefono
      };

      console.log('📝 Creando orden:', orderData);

      const response = await fetch('https://bandoggie-production.up.railway.app/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear la orden');
      }

      const result = await response.json();
      console.log('✅ Orden creada:', result.order);
      
      window.dispatchEvent(new Event('orderCreated'));
      
      return result.order;
      
    } catch (error) {
      console.error('❌ Error creando orden:', error);
      throw error;
    }
  };

  // ENVIAR EMAIL BANCARIO
  const sendBankingDetailsEmail = async (orderData) => {
    try {
      console.log('📧 Enviando email bancario...');
      
      const emailPayload = {
        customerName: `${orderData.customerInfo.nombre} ${orderData.customerInfo.apellido}`,
        email: orderData.customerInfo.email,
        totalAmount: parseFloat(orderData.total).toFixed(2),
        orderNumber: orderData.orderNumber || `ORD-${Date.now()}`
      };

      console.log('📤 Payload email:', emailPayload);

      const response = await fetch('https://bandoggie-production.up.railway.app/api/email/send-simple-banking-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailPayload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ Error enviando email:', errorData);
        throw new Error(errorData.error || 'Error al enviar email');
      }

      const result = await response.json();
      console.log('✅ Email enviado:', result);
      
      toast.success('Email con datos bancarios enviado');
      return { success: true, data: result };

    } catch (error) {
      console.error('❌ Error en email:', error);
      toast.warning('Pedido creado, pero hubo un problema con el email');
      return { success: false, error: error.message };
    }
  };

  // PROCESAR COMPRA
  const processCheckout = async () => {
    try {
      setLoading(true);
      setError(null);

      const shipping = 3.50;
      const subtotal = getCartTotal();
      const total = subtotal + shipping;

      console.log('🛒 Iniciando checkout...');

      // Crear carrito
      const cartId = await createCartInDatabase();
      
      // Crear orden
      const order = await createOrderInDatabase(cartId);

      // Preparar datos para email
      const orderData = {
        orderNumber: order._id,
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

      // Enviar email si es transferencia
      if (paymentMethod === 'transferencia') {
        await sendBankingDetailsEmail(orderData);
      }

      // Limpiar carrito
      setCartItems([]);
      localStorage.removeItem('bandoggie_cart');
      
      setCurrentStep('confirmation');
      toast.success('¡Pedido realizado exitosamente!');

    } catch (error) {
      console.error('❌ ERROR EN CHECKOUT:', error);
      const errorMessage = error.message || 'Error al procesar la compra';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Funciones del carrito
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
      console.error('Error actualizando cantidad:', error);
      toast.error('Error al actualizar cantidad');
    }
  };

  const removeFromCart = (productId) => {
    try {
      setCartItems(prevItems => 
        prevItems.filter(item => item._id !== productId && item.id !== productId)
      );
      toast.success('Producto eliminado');
    } catch (error) {
      console.error('Error removiendo producto:', error);
      toast.error('Error al remover producto');
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 0;
      return total + (price * quantity);
    }, 0);
  };

  const formatPrice = (price) => {
    const numPrice = parseFloat(price) || 0;
    return `$${numPrice.toFixed(2)}`;
  };

  // Navegación
  const nextStep = () => {
    try {
      if (currentStep === 'cart') {
        if (isAuthenticated && user) {
          setCurrentStep('delivery');
        } else {
          setCurrentStep('checkout');
        }
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
      console.error('Error en nextStep:', error);
      setError('Error al avanzar');
    }
  };

  // Calcular totales
  const subtotal = getCartTotal();
  const shipping = 3.50;
  const total = subtotal + shipping;
  const hasError = error || internalError;

  // Componente de Resumen
  const CartSummary = () => (
    <div className="cart-summary">
      <h3 className="cart-summary-title">En tu carrito</h3>
      
      {cartItems.map(item => (
        <div key={item._id || item.id} className="cart-summary-item">
          <div className="cart-summary-image">
            {item.image ? (
              <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', backgroundColor: '#4169E1', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px' }}>📦</div>
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

  // Loading
  if (loading) {
    return (
      <div className="cart-container">
        <div className="cart-scroll-content">
          <div className="cart-card" style={{ textAlign: 'center', padding: '40px' }}>
            <h2>Cargando carrito...</h2>
          </div>
        </div>
      </div>
    );
  }

  // Confirmación
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
                <p>Hemos enviado los datos bancarios a <strong>{formData.email}</strong>.</p>
                <p>Una vez realices la transferencia, nos comunicaremos contigo.</p>
                <p>¡Gracias por confiar en BanDoggie!</p>
              </div>
            ) : (
              <div className="cart-efectivo-text">
                <p>Tu pedido ha sido registrado.</p>
                <p>El pago se realizará en efectivo al momento de la entrega.</p>
                <p>¡Gracias por confiar en BanDoggie!</p>
              </div>
            )}

            <button className="cart-continue-button" onClick={() => {
              onClose();
              setFormData({ email: '', nombre: '', apellido: '', departamento: '', region: '', direccion: '', referencia: '', telefono: '' });
              setCurrentStep('cart');
              setError(null);
            }}>
              Volver al catálogo
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Vista del Carrito
  if (currentStep === 'cart') {
    return (
      <div className="cart-container">
        <div className="cart-scroll-content">
          <div className="cart-step-header">
            <div className="cart-step-number"><span className="cart-step-number-text">1</span></div>
            <h2 className="cart-step-title">Tu carrito</h2>
          </div>

          {cartItems.length === 0 ? (
            <div className="cart-card">
              <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>Tu carrito está vacío</p>
              <div className="cart-button-container">
                <button className="cart-primary-button" onClick={onClose}>Ir al catálogo</button>
              </div>
            </div>
          ) : (
            <>
              <div className="cart-card">
                {cartItems.map(item => (
                  <div key={item._id || item.id} className="cart-item">
                    <div className="cart-product-image">
                      {item.image ? (
                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', backgroundColor: '#4169E1', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '32px' }}>📦</div>
                      )}
                    </div>
                    
                    <div className="cart-product-details">
                      <div className="cart-product-label">Producto</div>
                      <div className="cart-product-name">{item.name}</div>
                      <div className="cart-product-specs">
                        {item.talla && `Talla: ${item.talla}`}
                        {item.color && ` | Color: ${item.color}`}
                      </div>
                    </div>

                    <div className="cart-price-section">
                      <div className="cart-section-label">Precio</div>
                      <div className="cart-price-value">{formatPrice(item.price)}</div>
                    </div>

                    <div className="cart-quantity-section">
                      <div className="cart-section-label">Cantidad</div>
                      <div className="cart-quantity-controls">
                        <button className="cart-quantity-button" onClick={() => updateQuantity(item._id || item.id, item.quantity - 1)} disabled={loading}>
                          <Minus size={16} />
                        </button>
                        <span className="cart-quantity-text">{item.quantity}</span>
                        <button className="cart-quantity-button" onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)} disabled={loading}>
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="cart-subtotal-section">
                      <div className="cart-section-label">Subtotal</div>
                      <div className="cart-subtotal-value">{formatPrice(item.subtotal)}</div>
                    </div>

                    <button className="cart-remove-button" onClick={() => removeFromCart(item._id || item.id)} disabled={loading}>🗑️ Eliminar</button>
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
                </div>

                {hasError && (
                  <div style={{ margin: '12px 0', padding: '8px', backgroundColor: '#fee', color: '#c33', borderRadius: '4px', fontSize: '14px' }}>
                    {error || internalError}
                  </div>
                )}

                <div className="cart-button-container">
                  <button className="cart-secondary-button" onClick={onClose}>Regresar al catálogo</button>
                  <button className="cart-primary-button" onClick={nextStep} disabled={loading}>
                    {loading ? 'Procesando...' : 'Continuar compra'}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // Checkout (solo invitados)
  if (currentStep === 'checkout') {
    return (
      <div className="cart-container">
        <div className="cart-scroll-content">
          <div className="cart-step-header">
            <div className="cart-step-number"><span className="cart-step-number-text">2</span></div>
            <h2 className="cart-step-title">¿Quien hace la compra?</h2>
          </div>

          <div className="cart-checkout-container">
            <div className="cart-checkout-form">
              <div className="cart-guest-form">
                <h3 className="cart-guest-title">Ingresa como invitado</h3>
                
                <label className="cart-input-label">Email</label>
                <input className={`cart-text-input ${errors.email ? 'cart-input-error' : ''}`} type="email" placeholder="tu@email.com" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} />
                {errors.email && <div className="cart-error-message">{errors.email}</div>}

                <div className="cart-name-row">
                  <div className="cart-name-field">
                    <label className="cart-input-label">Nombre</label>
                    <input className={`cart-text-input ${errors.nombre ? 'cart-input-error' : ''}`} type="text" placeholder="Nombre" value={formData.nombre} onChange={(e) => handleInputChange('nombre', e.target.value)} />
                    {errors.nombre && <div className="cart-error-message">{errors.nombre}</div>}
                  </div>
                  <div className="cart-name-field">
                    <label className="cart-input-label">Apellido</label>
                    <input className={`cart-text-input ${errors.apellido ? 'cart-input-error' : ''}`} type="text" placeholder="Apellido" value={formData.apellido} onChange={(e) => handleInputChange('apellido', e.target.value)} />
                    {errors.apellido && <div className="cart-error-message">{errors.apellido}</div>}
                  </div>
                </div>

                <button className="cart-continue-button" onClick={nextStep} disabled={loading}>
                  {loading ? 'Procesando...' : 'Continuar'}
                </button>

                <div className="cart-login-prompt">
                  <span className="cart-login-prompt-text">¿Ya tienes una cuenta? </span>
                  <button className="cart-login-button" type="button" onClick={() => {
                    onClose();
                    window.dispatchEvent(new CustomEvent('openLoginModal'));
                    toast.success('Cerrando carrito para iniciar sesión...');
                  }}>
                    Inicia Sesión
                  </button>
                </div>
              </div>
            </div>

            <CartSummary />
          </div>

          <button className="cart-back-link" onClick={() => setCurrentStep('cart')}>Regresar al carrito</button>
        </div>
      </div>
    );
  }

  // Entrega
  if (currentStep === 'delivery') {
    return (
      <div className="cart-container">
        <div className="cart-scroll-content">
          <div className="cart-step-header">
            <div className="cart-step-number"><span className="cart-step-number-text">{isAuthenticated ? '2' : '3'}</span></div>
            <h2 className="cart-step-title">¿A donde enviamos tu orden?</h2>
          </div>

          <div className="cart-checkout-container">
            <div className="cart-delivery-form">
              <label className="cart-country-label">País</label>
              <div className="cart-country-value">El Salvador</div>

              <div className="cart-select-row">
                <div className="cart-select-field">
                  <label className="cart-input-label">Departamento *</label>
                  <select className={`cart-select-input ${errors.departamento ? 'cart-input-error' : ''}`} value={formData.departamento} onChange={(e) => handleInputChange('departamento', e.target.value)}>
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
                  <select className={`cart-select-input ${errors.region ? 'cart-input-error' : ''}`} value={formData.region} onChange={(e) => handleInputChange('region', e.target.value)}>
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
              <input className={`cart-text-input ${errors.direccion ? 'cart-input-error' : ''}`} type="text" placeholder="Dirección completa" value={formData.direccion} onChange={(e) => handleInputChange('direccion', e.target.value)} />
              {errors.direccion && <div className="cart-error-message">{errors.direccion}</div>}

              <label className="cart-input-label">Punto de referencia</label>
              <input className="cart-text-input" type="text" placeholder="Referencia cercana" value={formData.referencia} onChange={(e) => handleInputChange('referencia', e.target.value)} />

              <label className="cart-input-label">Teléfono de contacto *</label>
              <input 
                className={`cart-text-input ${errors.telefono ? 'cart-input-error' : ''}`} 
                type="tel" 
                placeholder="0000-0000" 
                value={formData.telefono} 
                onChange={(e) => handleInputChange('telefono', e.target.value)}
                maxLength="9"
              />
              {errors.telefono && <div className="cart-error-message">{errors.telefono}</div>}
              <small style={{ color: '#666', fontSize: '12px', display: 'block', marginTop: '4px' }}>
                Formato: 8 dígitos (ej: 7777-7777)
              </small>

              <div className="cart-note-container">
                <div className="cart-note-text">
                  <span className="cart-note-bold">NOTA:</span> Las entregas son realizadas por encomiendas, nos comunicaremos contigo sobre los detalles.
                </div>
              </div>

              <button className="cart-continue-button" onClick={nextStep} disabled={loading}>
                {loading ? 'Procesando...' : 'Continuar a pago'}
              </button>
            </div>

            <CartSummary />
          </div>

          <button className="cart-back-link" onClick={() => setCurrentStep(isAuthenticated ? 'cart' : 'checkout')}>Regresar</button>
        </div>
      </div>
    );
  }

  // Pago
  if (currentStep === 'payment') {
    return (
      <div className="cart-container">
        <div className="cart-scroll-content">
          <div className="cart-step-header">
            <div className="cart-step-number"><span className="cart-step-number-text">{isAuthenticated ? '3' : '4'}</span></div>
            <h2 className="cart-step-title">Métodos de pago</h2>
          </div>

          <div className="cart-checkout-container">
            <div className="cart-payment-form">
              <div className="cart-payment-toggle">
                <button className="cart-toggle-button" style={{ backgroundColor: paymentMethod === 'transferencia' ? 'white' : 'transparent', color: paymentMethod === 'transferencia' ? '#4a90a4' : 'white' }} onClick={() => setPaymentMethod('transferencia')}>
                  Transferencia
                </button>
                <button className="cart-toggle-button" style={{ backgroundColor: paymentMethod === 'efectivo' ? 'white' : 'transparent', color: paymentMethod === 'efectivo' ? '#4a90a4' : 'white' }} onClick={() => setPaymentMethod('efectivo')}>
                  Efectivo
                </button>
              </div>

              {paymentMethod === 'transferencia' ? (
                <div className="cart-payment-content">
                  <div className="cart-green-checkmark">✓</div>
                  <h3 className="cart-confirmation-title">Confirmación de pedido</h3>
                  <p className="cart-confirmation-text">
                    ¿Estás seguro de continuar? Te enviaremos a tu correo los datos para realizar la transferencia.
                  </p>
                  <button className="cart-continue-button" onClick={nextStep} disabled={loading}>
                    {loading ? 'Procesando...' : 'Finalizar compra'}
                  </button>
                </div>
              ) : (
                <div className="cart-payment-content">
                  <p className="cart-efectivo-text">
                    ¡Gracias por tu compra! El pago se realizará en efectivo al momento de la entrega.
                  </p>
                  <button className="cart-continue-button" onClick={nextStep} disabled={loading}>
                    {loading ? 'Procesando...' : 'Finalizar compra'}
                  </button>
                </div>
              )}

              {hasError && (
                <div style={{ margin: '16px 0', padding: '12px', backgroundColor: '#fee2e2', color: '#dc2626', borderRadius: '6px', fontSize: '14px', textAlign: 'center' }}>
                  {error || internalError}
                </div>
              )}
            </div>

            <CartSummary />
          </div>

          <button className="cart-back-link" onClick={() => setCurrentStep('delivery')}>Regresar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-scroll-content">
        <div className="cart-card">
          <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>Cargando...</p>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartApp;