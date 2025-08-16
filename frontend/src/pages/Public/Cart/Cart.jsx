import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import './Cart.css'; 

const ShoppingCartApp = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState('cart');
  const [paymentMethod, setPaymentMethod] = useState('transferencia');
  
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Bandana para mascotas Conjunto Cielo',
      price: 22.00,
      quantity: 2,
      specs: 'Azul cuadriculado / XL'
    },
    {
      id: 2,
      name: 'Collar para perro diseño liso',
      price: 17.55,
      quantity: 1,
      specs: 'Verde / M / "Toffee"'
    }
  ]);

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

  // Handle form input changes - FUNCIÓN CORREGIDA
  const handleInputChange = (field, value) => {
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
  };

  // Validation functions
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

  // Validate checkout form
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

  // Validate delivery form
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
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
      return;
    }
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 3.50;
  const total = subtotal + shipping;

  const nextStep = () => {
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
      setCurrentStep('confirmation');
    } else if (currentStep === 'confirmation') {
      setCurrentStep('final');
    }
  };

  // Cart Summary Component
  const CartSummary = () => (
    <div className="cart-summary">
      <h3 className="cart-summary-title">En tu carrito</h3>
      
      {cartItems.map(item => (
        <div key={item.id} className="cart-summary-item">
          <div className="cart-summary-image"></div>
          <div className="cart-summary-details">
            <div className="cart-summary-item-name">{item.name}</div>
            <div className="cart-summary-specs">{item.specs}</div>
            <div className="cart-summary-quantity">{item.quantity}x</div>
          </div>
          <div className="cart-summary-price">${(item.price * item.quantity).toFixed(2)}</div>
        </div>
      ))}

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

        <div className="cart-card">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-product-image"></div>
              
              <div className="cart-product-details">
                <div className="cart-product-label">Producto</div>
                <div className="cart-product-name">{item.name}</div>
                <div className="cart-product-specs">Especificaciones: {item.specs}</div>
              </div>

              <div className="cart-price-section">
                <div className="cart-section-label">Precio</div>
                <div className="cart-price-value">${item.price.toFixed(2)}</div>
              </div>

              <div className="cart-quantity-section">
                <div className="cart-section-label">Cantidad</div>
                <div className="cart-quantity-controls">
                  <button 
                    className="cart-quantity-button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="cart-quantity-text">{item.quantity}</span>
                  <button 
                    className="cart-quantity-button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="cart-subtotal-section">
                <div className="cart-section-label">Subtotal</div>
                <div className="cart-subtotal-value">${(item.price * item.quantity).toFixed(2)}</div>
              </div>

              <button 
                className="cart-remove-button"
                onClick={() => removeItem(item.id)}
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
          </div>

          <div className="cart-button-container">
            <button className="cart-secondary-button" onClick={onClose}>
              Regresar al catálogo
            </button>
            <button className="cart-primary-button" onClick={nextStep}>
              Continuar compra
            </button>
          </div>
        </div>
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

              <button className="cart-continue-button" onClick={nextStep}>
                Continuar
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
          Regresar al catálogo
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

            <button className="cart-continue-button" onClick={nextStep}>
              Continuar a pago
            </button>
          </div>

          <CartSummary />
        </div>

        <button className="cart-back-link" onClick={() => setCurrentStep('checkout')}>
          Regresar al catálogo
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
                <button className="cart-continue-button" onClick={nextStep}>
                  Continuar
                </button>
              </div>
            ) : (
              <div className="cart-payment-content">
                <p className="cart-efectivo-text">
                  ¡Gracias por tu compra! El pago se realizará en efectivo al momento de la entrega de tu producto.
                </p>
                <button className="cart-continue-button" onClick={onClose}>
                  Finalizar
                </button>
              </div>
            )}
          </div>

          <CartSummary />
        </div>

        <button className="cart-back-link" onClick={() => setCurrentStep('delivery')}>
          Regresar al catálogo
        </button>
      </div>
    </div>
  );

  // Render current step
  if (currentStep === 'cart') return <CartView />;
  if (currentStep === 'checkout') return <CheckoutView />;
  if (currentStep === 'delivery') return <DeliveryView />;
  if (currentStep === 'payment') return <PaymentView />;
  
  return <CartView />;
};

export default ShoppingCartApp;