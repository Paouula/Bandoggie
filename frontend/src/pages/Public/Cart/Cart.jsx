import React, { useState, useEffect } from 'react';
import { Minus, Plus } from 'lucide-react';
import './Cart.css'; 

// Importaciones directas
import useFetchCart from '../../../hooks/Products/useFetchCart';
import useAddToCart from '../../../hooks/Products/useAddToCart ';
import useFetchProducts from '../../../hooks/Products/useFetchProducts';

const ShoppingCartApp = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState('cart');
  const [paymentMethod, setPaymentMethod] = useState('transferencia');
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [internalError, setInternalError] = useState(null);
  
  // Hooks principales
  const {
    cart,
    cartProducts,
    loading: cartLoading,
    error: cartError,
    guestId,
    handleAddProduct,
    handleRemoveProduct,
    handleUpdateProductQuantity,
    handleClearCart,
    handleGuestCheckout,
    getCartSummary,
    isProductInCart,
    getProductQuantity
  } = useFetchCart();

  const {
    quickAdd,
    addWithCustomization,
    loading: addingToCart,
    error: addError,
    getProductInCart,
    getRecommendations,
    canAddProduct,
    clearError
  } = useAddToCart();

  const { 
    products, 
    loading: productsLoading,
    handleGetProducts 
  } = useFetchProducts();

  // Form states - CENTRALIZADO
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

  // Validation errors
  const [errors, setErrors] = useState({});

  // Estados derivados del carrito con valores por defecto
  const cartItems = Array.isArray(cartProducts) ? cartProducts : [];
  const summary = getCartSummary();
  const subtotal = Number(summary.totalPrice) || 0;
  const shipping = 3.50;
  const total = subtotal + shipping;
  const isLoading = cartLoading || addingToCart || productsLoading;
  const hasError = cartError || addError || internalError;

  // Productos recomendados con manejo de errores
  let recommendedProducts = [];
  try {
    recommendedProducts = getRecommendations(products).slice(0, 3);
  } catch (error) {
    console.error('Error getting recommendations:', error);
    recommendedProducts = [];
  }

  // Handle form input changes
  const handleInputChange = (field, value) => {
    try {
      setFormData(prevFormData => ({
        ...prevFormData,
        [field]: value
      }));
      
      // Clear error when user starts typing
      if (errors[field]) {
        setErrors(prevErrors => ({
          ...prevErrors,
          [field]: ''
        }));
      }
    } catch (error) {
      console.error('Error updating form data:', error);
    }
  };

  // Validation functions
  const validateEmail = (email) => {
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    } catch (error) {
      console.error('Error validating email:', error);
      return false;
    }
  };

  const validatePhone = (phone) => {
    try {
      const phoneRegex = /^[0-9]{8,}$/;
      return phoneRegex.test(phone.replace(/\s/g, ''));
    } catch (error) {
      console.error('Error validating phone:', error);
      return false;
    }
  };

  const validateRequired = (value) => {
    try {
      return value && value.trim().length > 0;
    } catch (error) {
      console.error('Error validating required field:', error);
      return false;
    }
  };

  const validateName = (name) => {
    try {
      return name && name.trim().length >= 2;
    } catch (error) {
      console.error('Error validating name:', error);
      return false;
    }
  };

  // Validate checkout form
  const validateCheckoutForm = () => {
    try {
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
    } catch (error) {
      console.error('Error validating checkout form:', error);
      return false;
    }
  };

  // Validate delivery form
  const validateDeliveryForm = () => {
    try {
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

      if (!validateName(formData.nombre)) {
        newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
      }

      if (!validateName(formData.apellido)) {
        newErrors.apellido = 'El apellido debe tener al menos 2 caracteres';
      }

      if (!validatePhone(formData.telefono)) {
        newErrors.telefono = 'Por favor ingresa un número de teléfono válido (mínimo 8 dígitos)';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    } catch (error) {
      console.error('Error validating delivery form:', error);
      return false;
    }
  };

  // Función para enviar email con datos bancarios
  const sendBankingDetailsEmail = async (orderData) => {
    try {
      const emailData = {
        to: orderData.customerInfo.email,
        subject: 'Datos para transferencia bancaria - BanDoggie',
        orderInfo: {
          orderNumber: `ORD-${Date.now()}`,
          customerName: `${orderData.customerInfo.nombre} ${orderData.customerInfo.apellido}`,
          total: total.toFixed(2),
          items: cartItems.map(item => ({
            name: item.name || 'Producto',
            quantity: item.quantity || 1,
            price: item.price || 0,
            subtotal: item.subtotal || 0
          })),
          shippingCost: shipping.toFixed(2)
        },
        bankingDetails: {
          bankName: 'Banco Agrícola',
          accountNumber: '1234567890',
          accountHolder: 'BanDoggie S.A. de C.V.',
          accountType: 'Cuenta Corriente',
          reference: `BANDOGGIE-${Date.now()}`
        }
      };

      const response = await fetch('http://localhost:4000/api/send-banking-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData)
      });

      if (!response.ok) {
        throw new Error('Error al enviar el email');
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending banking email:', error);
      throw error;
    }
  };

  // Funciones del carrito usando el hook
  const updateQuantity = async (productId, newQuantity) => {
    try {
      clearError();
      if (newQuantity <= 0) {
        await handleRemoveProduct(productId);
      } else {
        await handleUpdateProductQuantity(productId, newQuantity);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      setInternalError('Error al actualizar la cantidad');
    }
  };

  const removeItem = async (productId) => {
    try {
      clearError();
      await handleRemoveProduct(productId);
    } catch (error) {
      console.error('Error removing item:', error);
      setInternalError('Error al eliminar el producto');
    }
  };

  // Función para agregar productos recomendados al carrito
  const addRecommendedProduct = async (product) => {
    try {
      clearError();
      const result = await quickAdd(product);
      if (result.success) {
        console.log(`${product.nameProduct || product.name} agregado al carrito`);
      }
    } catch (error) {
      console.error('Error adding recommended product:', error);
      setInternalError('Error al agregar el producto recomendado');
    }
  };

  // Función para vaciar carrito
  const clearCart = async () => {
    if (window.confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      try {
        await handleClearCart();
      } catch (error) {
        console.error('Error clearing cart:', error);
        setInternalError('Error al vaciar el carrito');
      }
    }
  };

  // Procesar compra
  const processCheckout = async () => {
    try {
      const orderData = {
        customerInfo: {
          nombre: formData.nombre,
          apellido: formData.apellido,
          email: formData.email
        },
        deliveryInfo: {
          departamento: formData.departamento,
          region: formData.region,
          direccion: formData.direccion,
          referencia: formData.referencia,
          telefono: formData.telefono
        },
        paymentMethod: paymentMethod,
        items: cartItems,
        total: total,
        shippingCost: shipping
      };

      // Crear la orden primero
      const result = await handleGuestCheckout(orderData);
      console.log('Order created successfully:', result);
      
      // Si es transferencia, enviar email con datos bancarios
      if (paymentMethod === 'transferencia') {
        try {
          await sendBankingDetailsEmail(orderData);
          setCurrentStep('confirmation');
        } catch (emailError) {
          console.error('Error sending email:', emailError);
          alert('Compra realizada exitosamente. Los datos bancarios se enviarán por correo en breve.');
          setCurrentStep('confirmation');
        }
      } else {
        setCurrentStep('confirmation');
      }
      
    } catch (error) {
      console.error('Error processing checkout:', error);
      setInternalError('Error al procesar la compra. Inténtalo de nuevo.');
    }
  };

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
      setInternalError('Error al avanzar al siguiente paso');
    }
  };

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

  // Mostrar loading si es necesario
  if (isLoading && cartItems.length === 0 && products.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-scroll-content">
          <div className="cart-step-header">
            <div className="cart-step-number">
              <span className="cart-step-number-text">1</span>
            </div>
            <h2 className="cart-step-title">Cargando...</h2>
          </div>
          <p style={{ textAlign: 'center', padding: '40px' }}>Cargando carrito...</p>
        </div>
      </div>
    );
  }

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
          {recommendedProducts.map(product => {
            if (!product || !product._id) return null;
            
            let productStatus;
            try {
              productStatus = canAddProduct(product);
            } catch (error) {
              console.error('Error checking if can add product:', error);
              productStatus = { canAdd: false, reason: 'Error' };
            }

            return (
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
                  backgroundPosition: 'center'
                }} />
                
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
                  disabled={!productStatus.canAdd || addingToCart}
                  style={{
                    width: '100%',
                    padding: '6px 12px',
                    fontSize: '12px',
                    backgroundColor: productStatus.canAdd ? '#4a90a4' : '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: productStatus.canAdd ? 'pointer' : 'not-allowed',
                    opacity: (!productStatus.canAdd || addingToCart) ? 0.6 : 1
                  }}
                >
                  {addingToCart ? 'Agregando...' : 
                   productStatus.canAdd ? 'Agregar' : productStatus.reason}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Cart Summary Component
  const CartSummary = () => (
    <div className="cart-summary">
      <h3 className="cart-summary-title">En tu carrito</h3>
      
      {cartItems.map(item => {
        if (!item || !item.id) return null;
        
        return (
          <div key={item.id} className="cart-summary-item">
            <div className="cart-summary-image">
              {item.productInfo?.image ? (
                <img 
                  src={item.productInfo.image} 
                  alt={item.name || 'Producto'}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                />
              ) : (
                <div style={{ width: '100%', height: '100%', backgroundColor: '#4169E1', borderRadius: '8px' }} />
              )}
            </div>
            <div className="cart-summary-details">
              <div className="cart-summary-item-name">{item.name || 'Producto'}</div>
              <div className="cart-summary-specs">
                {item.talla && `Talla: ${item.talla}`}
                {item.color && ` / Color: ${item.color}`}
                {item.petName && ` / Mascota: ${item.petName}`}
              </div>
              <div className="cart-summary-quantity">{item.quantity || 1}x</div>
            </div>
            <div className="cart-summary-price">${Number(item.subtotal || 0).toFixed(2)}</div>
          </div>
        );
      })}

      <div className="cart-summary-totals">
        <div className="cart-summary-row">
          <span className="cart-summary-label">Costo estimado de envío:</span>
          <span className="cart-summary-value">${shipping.toFixed(2)}</span>
        </div>
        <div className="cart-summary-total-row">
          <span className="cart-summary-total-label">TOTAL:</span>
          <span className="cart-summary-total-value">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );

  // Confirmation View
  const ConfirmationView = () => (
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

          <button 
            className="cart-continue-button" 
            onClick={() => {
              onClose();
              // Resetear el formulario
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
              setInternalError(null);
            }}
          >
            Volver al catálogo
          </button>
        </div>
      </div>
    </div>
  );

  // Cart View
  const CartView = () => (
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
              Tu carrito está vacío
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
            
            <div className="cart-button-container">
              <button className="cart-primary-button" onClick={onClose}>
                Ir al catálogo
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="cart-card">
              {cartItems.map(item => {
                if (!item || !item.id) return null;
                
                return (
                  <div key={item.id} className="cart-item">
                    <div className="cart-product-image">
                      {item.productInfo?.image ? (
                        <img 
                          src={item.productInfo.image} 
                          alt={item.name || 'Producto'}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                        />
                      ) : (
                        <div style={{ width: '100%', height: '100%', backgroundColor: '#4169E1', borderRadius: '8px' }} />
                      )}
                    </div>
                    
                    <div className="cart-product-details">
                      <div className="cart-product-label">Producto</div>
                      <div className="cart-product-name">{item.name || 'Producto'}</div>
                      <div className="cart-product-specs">
                        Especificaciones: 
                        {item.talla && ` Talla: ${item.talla}`}
                        {item.color && ` / Color: ${item.color}`}
                        {item.petName && ` / Mascota: ${item.petName}`}
                      </div>
                    </div>

                    <div className="cart-price-section">
                      <div className="cart-section-label">Precio</div>
                      <div className="cart-price-value">${Number(item.price || 0).toFixed(2)}</div>
                    </div>

                    <div className="cart-quantity-section">
                      <div className="cart-section-label">Cantidad</div>
                      <div className="cart-quantity-controls">
                        <button 
                          className="cart-quantity-button"
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                          disabled={isLoading}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="cart-quantity-text">{item.quantity || 1}</span>
                        <button 
                          className="cart-quantity-button"
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                          disabled={isLoading}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="cart-subtotal-section">
                      <div className="cart-section-label">Subtotal</div>
                      <div className="cart-subtotal-value">${Number(item.subtotal || 0).toFixed(2)}</div>
                    </div>

                    <button 
                      className="cart-remove-button"
                      onClick={() => removeItem(item.id)}
                      disabled={isLoading}
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="cart-summary-card">
              <div className="cart-summary-content">
                <div className="cart-summary-row">
                  <span className="cart-summary-label">Subtotal:</span>
                  <span className="cart-summary-orange-value">${subtotal.toFixed(2)}</span>
                </div>
                <div className="cart-summary-row">
                  <span className="cart-summary-label">Costo estimado de envío:</span>
                  <span className="cart-summary-orange-value">${shipping.toFixed(2)}</span>
                </div>
                <div className="cart-summary-total-row">
                  <span className="cart-summary-total-label">TOTAL:</span>
                  <span className="cart-summary-total-value">${total.toFixed(2)}</span>
                </div>
                
                {/* Información del carrito */}
                {guestId && (
                  <div style={{ marginTop: '12px', padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      Guest ID: {guestId.slice(-8)}... | Items: {summary.itemCount || 0}
                    </div>
                  </div>
                )}
              </div>

              {/* Mostrar errores si existen */}
              {hasError && (
                <div style={{ 
                  margin: '12px 0', 
                  padding: '8px', 
                  backgroundColor: '#fee', 
                  color: '#c33', 
                  borderRadius: '4px', 
                  fontSize: '14px' 
                }}>
                  {cartError || addError || internalError}
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
                    disabled={isLoading}
                  >
                    {isLoading ? 'Procesando...' : 'Continuar compra'}
                  </button>
                  <button
                    onClick={clearCart}
                    disabled={isLoading}
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

  // Checkout View
  const CheckoutView = () => (
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
                disabled={isLoading}
              >
                {isLoading ? 'Procesando...' : 'Continuar'}
              </button>

              <div className="cart-login-prompt">
                <span className="cart-login-prompt-text">¿Ya tienes una cuenta? </span>
                <button className="cart-login-button">
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

  // Delivery View
  const DeliveryView = () => (
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
              disabled={isLoading}
            >
              {isLoading ? 'Procesando...' : 'Continuar a pago'}
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

  // Payment View
  const PaymentView = () => (
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
                  disabled={isLoading}
                >
                  {isLoading ? 'Procesando...' : 'Finalizar compra'}
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
                  disabled={isLoading}
                >
                  {isLoading ? 'Procesando...' : 'Finalizar compra'}
                </button>
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

  // Mostrar errores si existen
  useEffect(() => {
    if (hasError) {
      console.error('Cart error:', hasError);
    }
  }, [hasError]);

  // Cargar productos al montar el componente
  useEffect(() => {
    try {
      if (products.length === 0 && handleGetProducts) {
        handleGetProducts().catch(error => {
          console.error('Error loading products:', error);
          setInternalError('Error al cargar productos');
        });
      }
    } catch (error) {
      console.error('Error in useEffect for products:', error);
    }
  }, [products.length, handleGetProducts]);

  // Limpiar errores internos después de un tiempo
  useEffect(() => {
    if (internalError && !internalError.includes('hooks')) {
      const timer = setTimeout(() => {
        setInternalError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [internalError]);

  // Render current step
  try {
    if (currentStep === 'cart') return <CartView />;
    if (currentStep === 'checkout') return <CheckoutView />;
    if (currentStep === 'delivery') return <DeliveryView />;
    if (currentStep === 'payment') return <PaymentView />;
    if (currentStep === 'confirmation') return <ConfirmationView />;
    
    return <CartView />;
  } catch (error) {
    console.error('Error rendering cart step:', error);
    setInternalError('Error al mostrar el carrito');
    return <CartView />;
  }
};

export default ShoppingCartApp;