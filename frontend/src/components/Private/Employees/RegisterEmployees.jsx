import React from 'react';
import './RegisterEmployee.css';
import { Camera, X, User, Mail, Phone, MapPin, Calendar, CreditCard, Lock } from 'lucide-react';
import useDataEmployees from '../Employees/hooks/useDataEmployees.jsx';

export default function RegisterEmployee({ onClose, employeeToEdit = null }) {
  const {
    name,
    setName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    telephone,
    setTelephone,
    dui,
    setDui,
    address,
    setAddress,
    birthdate,
    setBirthdate,
    hireDate,
    setHireDate,
    isssNumber,
    setIsssNumber,
    errorEmpleado,
    loading,
    isEditing,
    handleSubmit,
    handleUpdate,
    cleanData,
  } = useDataEmployees();

  // Estados para validaciones
  const [validationErrors, setValidationErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});

  // Expresiones regulares para validaciones
  const validations = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    dui: /^\d{8}-\d{1}$/,
    telephone: /^\d{4}-\d{4}$/,
    isssNumber: /^\d{9}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
    name: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/,
  };

  // Función para validar campos
  const validateField = (fieldName, value) => {
    const errors = {};

    switch (fieldName) {
      case 'name':
      case 'lastName':
        if (!value.trim()) {
          errors[fieldName] = 'Este campo es obligatorio';
        } else if (!validations.name.test(value)) {
          errors[fieldName] = 'Solo se permiten letras y espacios (2-50 caracteres)';
        }
        break;

      case 'email':
        if (!value.trim()) {
          errors[fieldName] = 'El correo es obligatorio';
        } else if (!validations.email.test(value)) {
          errors[fieldName] = 'Formato de correo inválido (ejemplo@dominio.com)';
        }
        break;

      case 'password':
        if (!employeeToEdit && !value.trim()) {
          errors[fieldName] = 'La contraseña es obligatoria';
        } else if (value && !validations.password.test(value)) {
          errors[fieldName] = 'Mínimo 8 caracteres, una mayúscula, una minúscula y un número';
        }
        break;

      case 'telephone':
        if (!value.trim()) {
          errors[fieldName] = 'El teléfono es obligatorio';
        } else if (!validations.telephone.test(value)) {
          errors[fieldName] = 'Formato: 0000-0000';
        }
        break;

      case 'dui':
        if (!value.trim()) {
          errors[fieldName] = 'El DUI es obligatorio';
        } else if (!validations.dui.test(value)) {
          errors[fieldName] = 'Formato: 00000000-0';
        }
        break;

      case 'isssNumber':
        if (!value.trim()) {
          errors[fieldName] = 'El número ISSS es obligatorio';
        } else if (!validations.isssNumber.test(value)) {
          errors[fieldName] = 'Debe contener exactamente 9 dígitos';
        }
        break;

      case 'address':
        if (!value.trim()) {
          errors[fieldName] = 'La dirección es obligatoria';
        } else if (value.length < 10) {
          errors[fieldName] = 'La dirección debe tener al menos 10 caracteres';
        }
        break;

      case 'birthdate':
        if (!value) {
          errors[fieldName] = 'La fecha de nacimiento es obligatoria';
        } else {
          const birthDate = new Date(value);
          const today = new Date();
          const age = today.getFullYear() - birthDate.getFullYear();
          if (age < 18 || age > 90) {
            errors[fieldName] = 'La edad debe estar entre 18 y 90 años';
          }
        }
        break;

      case 'hireDate':
        if (!value) {
          errors[fieldName] = 'La fecha de ingreso es obligatoria';
        } else {
          const hireDate = new Date(value);
          const today = new Date();
          if (hireDate > today) {
            errors[fieldName] = 'La fecha de ingreso no puede ser futura';
          }
        }
        break;

      default:
        break;
    }

    return errors;
  };

  // Manejar cambios en los campos con validación
  const handleFieldChange = (fieldName, value, setter) => {
    setter(value);
    
    // Marcar como tocado
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    
    // Validar campo
    const fieldErrors = validateField(fieldName, value);
    setValidationErrors(prev => ({
      ...prev,
      ...fieldErrors,
      [fieldName]: fieldErrors[fieldName] || undefined
    }));
  };

  // Formatear DUI mientras se escribe
  const formatDui = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 8) {
      return numbers;
    }
    return `${numbers.slice(0, 8)}-${numbers.slice(8, 9)}`;
  };

  // Formatear teléfono mientras se escribe
  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 4) {
      return numbers;
    }
    return `${numbers.slice(0, 4)}-${numbers.slice(4, 8)}`;
  };

  // Formatear número ISSS
  const formatIsss = (value) => {
    return value.replace(/\D/g, '').slice(0, 9);
  };

  // Si hay un empleado para editar, cargar sus datos
  React.useEffect(() => {
    if (employeeToEdit) {
      setName(employeeToEdit.name || '');
      setLastName(employeeToEdit.lastName || '');
      setEmail(employeeToEdit.email || '');
      setTelephone(employeeToEdit.telephone || '');
      setDui(employeeToEdit.dui || '');
      setAddress(employeeToEdit.address || '');
      setBirthdate(employeeToEdit.birthdate || '');
      setHireDate(employeeToEdit.hireDate || '');
      setIsssNumber(employeeToEdit.isssNumber || '');
    }
  }, [employeeToEdit]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Validar todos los campos antes de enviar
    const fieldsToValidate = [
      'name', 'lastName', 'email', 'telephone', 'dui', 
      'address', 'birthdate', 'hireDate', 'isssNumber'
    ];
    
    if (!employeeToEdit) {
      fieldsToValidate.push('password');
    }

    let allErrors = {};
    fieldsToValidate.forEach(field => {
      const fieldValue = {
        name, lastName, email, telephone, dui,
        address, birthdate, hireDate, isssNumber, password
      }[field];
      
      const fieldErrors = validateField(field, fieldValue);
      allErrors = { ...allErrors, ...fieldErrors };
    });

    if (Object.keys(allErrors).length > 0) {
      setValidationErrors(allErrors);
      setTouched(fieldsToValidate.reduce((acc, field) => ({ ...acc, [field]: true }), {}));
      return;
    }

    if (employeeToEdit) {
      await handleUpdate(e);
    } else {
      await handleSubmit(e);
    }
    
    if (!errorEmpleado && Object.keys(validationErrors).length === 0) {
      onClose();
    }
  };

  const handleClose = () => {
    cleanData();
    setValidationErrors({});
    setTouched({});
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={handleClose} disabled={loading}>
          <X size={20} />
        </button>
        
        <div className="modal-header">
          <div className="avatar-container">
            <div className="avatar">
              <User size={32} color="white" />
            </div>
            <button className="camera-btn">
              <Camera size={14} color="white" />
            </button>
          </div>
          <h2 className="modal-title">
            {employeeToEdit ? 'Editar Empleado' : 'Agregar Empleado'}
          </h2>
          <p className="modal-subtitle">
            {employeeToEdit ? 'Actualiza la información del empleado' : 'Completa la información del nuevo empleado'}
          </p>
        </div>

        {errorEmpleado && (
          <div className="error-message">
            {errorEmpleado}
          </div>
        )}

        <div className="modal-body">
          <form onSubmit={handleFormSubmit}>
            <div className="form-section">
              <h3 className="section-title">
                <User size={20} color="#3b82f6" />
                Información Personal
              </h3>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    <User size={16} color="#6b7280" />
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => handleFieldChange('name', e.target.value, setName)}
                    className={`form-input ${touched.name && validationErrors.name ? 'error' : ''}`}
                    placeholder="Ingresa el nombre"
                    disabled={loading}
                  />
                  {touched.name && validationErrors.name && (
                    <span className="error-text">{validationErrors.name}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <User size={16} color="#6b7280" />
                    Apellidos
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => handleFieldChange('lastName', e.target.value, setLastName)}
                    className={`form-input ${touched.lastName && validationErrors.lastName ? 'error' : ''}`}
                    placeholder="Ingresa los apellidos"
                    disabled={loading}
                  />
                  {touched.lastName && validationErrors.lastName && (
                    <span className="error-text">{validationErrors.lastName}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <CreditCard size={16} color="#6b7280" />
                    DUI
                  </label>
                  <input
                    type="text"
                    value={dui}
                    onChange={(e) => {
                      const formatted = formatDui(e.target.value);
                      handleFieldChange('dui', formatted, setDui);
                    }}
                    className={`form-input ${touched.dui && validationErrors.dui ? 'error' : ''}`}
                    placeholder="00000000-0"
                    maxLength={10}
                    disabled={loading}
                  />
                  {touched.dui && validationErrors.dui && (
                    <span className="error-text">{validationErrors.dui}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Calendar size={16} color="#6b7280" />
                    Fecha de Nacimiento
                  </label>
                  <input
                    type="date"
                    value={birthdate}
                    onChange={(e) => handleFieldChange('birthdate', e.target.value, setBirthdate)}
                    className={`form-input ${touched.birthdate && validationErrors.birthdate ? 'error' : ''}`}
                    disabled={loading}
                  />
                  {touched.birthdate && validationErrors.birthdate && (
                    <span className="error-text">{validationErrors.birthdate}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Calendar size={16} color="#6b7280" />
                    Fecha de Ingreso
                  </label>
                  <input
                    type="date"
                    value={hireDate}
                    onChange={(e) => handleFieldChange('hireDate', e.target.value, setHireDate)}
                    className={`form-input ${touched.hireDate && validationErrors.hireDate ? 'error' : ''}`}
                    disabled={loading}
                  />
                  {touched.hireDate && validationErrors.hireDate && (
                    <span className="error-text">{validationErrors.hireDate}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <CreditCard size={16} color="#6b7280" />
                    Número ISSS
                  </label>
                  <input
                    type="text"
                    value={isssNumber}
                    onChange={(e) => {
                      const formatted = formatIsss(e.target.value);
                      handleFieldChange('isssNumber', formatted, setIsssNumber);
                    }}
                    className={`form-input ${touched.isssNumber && validationErrors.isssNumber ? 'error' : ''}`}
                    placeholder="123456789"
                    maxLength={9}
                    disabled={loading}
                  />
                  {touched.isssNumber && validationErrors.isssNumber && (
                    <span className="error-text">{validationErrors.isssNumber}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-title">
                <Mail size={20} color="#10b981" />
                Información de Contacto
              </h3>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    <Mail size={16} color="#6b7280" />
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => handleFieldChange('email', e.target.value, setEmail)}
                    className={`form-input ${touched.email && validationErrors.email ? 'error' : ''}`}
                    placeholder="ejemplo@correo.com"
                    disabled={loading}
                  />
                  {touched.email && validationErrors.email && (
                    <span className="error-text">{validationErrors.email}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Phone size={16} color="#6b7280" />
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={telephone}
                    onChange={(e) => {
                      const formatted = formatPhone(e.target.value);
                      handleFieldChange('telephone', formatted, setTelephone);
                    }}
                    className={`form-input ${touched.telephone && validationErrors.telephone ? 'error' : ''}`}
                    placeholder="0000-0000"
                    maxLength={9}
                    disabled={loading}
                  />
                  {touched.telephone && validationErrors.telephone && (
                    <span className="error-text">{validationErrors.telephone}</span>
                  )}
                </div>

                <div className="form-group full-width">
                  <label className="form-label">
                    <MapPin size={16} color="#6b7280" />
                    Dirección
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => handleFieldChange('address', e.target.value, setAddress)}
                    className={`form-input ${touched.address && validationErrors.address ? 'error' : ''}`}
                    placeholder="Calle, colonia, ciudad"
                    disabled={loading}
                  />
                  {touched.address && validationErrors.address && (
                    <span className="error-text">{validationErrors.address}</span>
                  )}
                </div>

                <div className="form-group full-width">
                  <label className="form-label">
                    <Lock size={16} color="#6b7280" />
                    Contraseña {employeeToEdit && '(dejar vacío para mantener la actual)'}
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => handleFieldChange('password', e.target.value, setPassword)}
                    className={`form-input ${touched.password && validationErrors.password ? 'error' : ''}`}
                    placeholder="Mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número"
                    disabled={loading}
                  />
                  {touched.password && validationErrors.password && (
                    <span className="error-text">{validationErrors.password}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                onClick={handleClose}
                className="modal-btn cancel-btn"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="modal-btn submit-btn"
                disabled={loading}
              >
                {loading ? 'Guardando...' : (employeeToEdit ? 'Actualizar Empleado' : 'Agregar Empleado')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}