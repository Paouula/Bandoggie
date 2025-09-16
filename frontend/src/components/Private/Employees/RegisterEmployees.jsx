import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import "./RegisterEmployee.css";
import DatePickerInput from "../../InputDataPicker/InputDataPicker.jsx";
import Button from '../../Button/Button.jsx'
import Input from '../../Input/Input.jsx'

import {
  Camera,
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Lock,
  CreditCard,
} from "lucide-react";

const RegisterEmployees = ({ onClose, onSave, isSubmitting, employeeToEdit = null }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true); // Activa la animación de cierre
    setTimeout(() => {
      onClose(); // Llama a la función de cierre después de la animación
    }, 300); // Duración de la animación (0.3s)
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, touchedFields },
    reset,
    trigger,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phoneEmployees: "",
      dateOfBirth: "",
      addressEmployees: "",
      password: "",
      hireDateEmployee: "",
      duiEmployees: "",
    },
  });

  // Cargar datos si se edita
  useEffect(() => {
    if (employeeToEdit) {
      reset({
        nameEmployees: employeeToEdit.nameEmployees || "",
        email: employeeToEdit.email || "",
        phoneEmployees: employeeToEdit.phoneEmployees || "",
        dateOfBirth: employeeToEdit.dateOfBirth
          ? new Date(employeeToEdit.dateOfBirth)
          : null,
        addressEmployees: employeeToEdit.addressEmployees || "",
        password: "",
        hireDateEmployee: employeeToEdit.hireDateEmployee
          ? new Date(employeeToEdit.hireDateEmployee)
          : null,
        duiEmployees: employeeToEdit.duiEmployees || "",
      });
    } else {
      reset({
        name: "",
        email: "",
        phoneEmployees: "",
        dateOfBirth: "",
        addressEmployees: "",
        password: "",
        hireDateEmployee: "",
        duiEmployees: "",
      });
    }
  }, [employeeToEdit, reset]);

  // Funciones para formateo inline de DUI y teléfono
  const formatDui = (value) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 8) return numbers;
    return `${numbers.slice(0, 8)}-${numbers.slice(8, 9)}`;
  };

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 4) return numbers;
    return `${numbers.slice(0, 4)}-${numbers.slice(4, 8)}`;
  };

  // Validaciones personalizadas
  const validateDui = (value) =>
    /^\d{8}-\d{1}$/.test(value) || "Formato: 00000000-0";
  const validatePhone = (value) =>
    /^\d{4}-\d{4}$/.test(value) || "Formato: 0000-0000";
  const validateEmail = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Formato de correo inválido";
  const validateName = (value) =>
    /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/.test(value) ||
    "Solo letras y espacios (2-50 caracteres)";
  const validatePassword = (value) => {
    if (employeeToEdit && !value) return true; // opcional si se edita
    return (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/.test(value) ||
      "Mínimo 8 caracteres, una mayúscula, una minúscula y un número"
    );
  };
  const validateAddress = (value) =>
    value.length >= 10 || "La dirección debe tener al menos 10 caracteres";
  const validateBirthDate = (value) => {
    if (!value) return "La fecha de nacimiento es obligatoria";
    const birthDate = new Date(value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    return (age >= 18 && age <= 90) || "La edad debe estar entre 18 y 90 años";
  };
  const validateHireDate = (value) => {
    if (!value) return "La fecha de ingreso es obligatoria";
    const hireDate = new Date(value);
    const today = new Date();
    return hireDate <= today || "La fecha de ingreso no puede ser futura";
  };

  // Submit del formulario
  const onSubmit = async (data) => {
    // Convertir fechas a strings ISO (solo fecha)
    const payload = {
      ...data,
      dateOfBirth: data.dateOfBirth
        ? new Date(data.dateOfBirth).toISOString().slice(0, 10)
        : "",
      hireDateEmployee: data.hireDateEmployee
        ? new Date(data.hireDateEmployee).toISOString().slice(0, 10)
        : "",
    };

    await onSave(payload);
  };

  return (
    <div
      className={`modal-overlay ${isClosing ? "fade-out" : ""}`}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="modal-content">
        <button
          className="modal-close"
          onClick={handleClose}
          disabled={isSubmitting}
        >
          <X size={20} />
        </button>

        <div className="modal-header">
          <div className="avatar-container">
            <div className="avatar">
              <User size={32} color="white" />
            </div>
            {/*<button className="camera-btn">
              <Camera size={14} color="white" />
            </button>*/}
          </div>
          <h2 className="modal-title">
            {employeeToEdit ? "Editar Empleado" : "Agregar Empleado"}
          </h2>
          <p className="modal-subtitle">
            {employeeToEdit
              ? "Actualiza la información del empleado"
              : "Completa la información del nuevo empleado"}
          </p>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Información Personal */}
            <div className="form-section">
              <h3 className="section-title">
                <User size={20} color="#F5A02D" /> Información Personal
              </h3>
              <div className="form-grid">
                {/* Nombre */}
                <div className="form-group">
                  <label className="form-label">
                    <User size={16} color="#6b7280" /> Nombre
                  </label>
                  <Input
                    type="text"
                    placeholder="Ingresa el nombre"
                    {...register("nameEmployees", {
                      required: "Este campo es obligatorio",
                      validate: validateName,
                    })}
                    className={`form-input ${errors.name ? "error" : ""}`}
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <span className="error-text">{errors.name.message}</span>
                  )}
                </div>

                {/* DUI */}
                <div className="form-group">
                  <label className="form-label">
                    <CreditCard size={16} color="#6b7280" /> DUI
                  </label>
                  <Input
                    type="text"
                    placeholder="00000000-0"
                    maxLength={10}
                    {...register("duiEmployees", {
                      required: "El DUI es obligatorio",
                      validate: validateDui,
                    })}
                    className={`form-input ${
                      errors.duiEmployees ? "error" : ""
                    }`}
                    disabled={isSubmitting}
                    onChange={(e) => {
                      e.target.value = formatDui(e.target.value);
                      // Se necesita disparar validación al cambiar valor externo
                      trigger("duiEmployees");
                    }}
                  />
                  {errors.duiEmployees && (
                    <span className="error-text">
                      {errors.duiEmployees.message}
                    </span>
                  )}
                </div>

                {/* Fecha de Nacimiento */}
                <div className="form-group">
                  <label className="form-label">
                    <Calendar size={16} color="#6b7280" /> Fecha de Nacimiento
                  </label>
                  <Controller
                    name="dateOfBirth"
                    control={control}
                    rules={{
                      required: "La fecha de nacimiento es obligatoria",
                      validate: validateBirthDate,
                    }}
                    render={({ field }) => (
                      <DatePickerInput 
                      className="form-input"
                        {...field}
                        error={errors.dateOfBirth}
                        onChange={(date) =>
                          field.onChange(date?.toISOString().slice(0, 10) || "")
                        }
                        value={field.value ? new Date(field.value) : null}
                        disabled={isSubmitting}
                      />
                    )}
                  />
                  {errors.dateOfBirth && (
                    <span className="error-text">
                      {errors.dateOfBirth.message}
                    </span>
                  )}
                </div>

                {/* Fecha de Ingreso */}
                <div className="form-group">
                  <label className="form-label">
                    <Calendar size={16} color="#6b7280" /> Fecha de Ingreso
                  </label>
                  <Controller
                    name="hireDateEmployee"
                    control={control}
                    rules={{
                      required: "La fecha de ingreso es obligatoria",
                      validate: validateHireDate,
                    }}
                    render={({ field }) => (
                      <DatePickerInput
                      className="form-input"
                        {...field}
                        error={errors.hireDateEmployee}
                        onChange={(date) =>
                          field.onChange(date?.toISOString().slice(0, 10) || "")
                        }
                        value={field.value ? new Date(field.value) : null}
                        disabled={isSubmitting}
                      />
                    )}
                  />
                  {errors.hireDateEmployee && (
                    <span className="error-text">
                      {errors.hireDateEmployee.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Información de Contacto */}
            <div className="form-section">
              <h3 className="section-title">
                <Mail size={20} color="#10b981" /> Información de Contacto
              </h3>
              <div className="form-grid">
                {/* Email */}
                <div className="form-group">
                  <label className="form-label">
                    <Mail size={16} color="#6b7280" /> Correo Electrónico
                  </label>
                  <Input
                    type="email"
                    placeholder="ejemplo@correo.com"
                    {...register("email", {
                      required: "El correo es obligatorio",
                      validate: validateEmail,
                    })}
                    className={`form-input ${errors.email ? "error" : ""}`}
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <span className="error-text">{errors.email.message}</span>
                  )}
                </div>

                {/* Teléfono */}
                <div className="form-group">
                  <label className="form-label">
                    <Phone size={16} color="#6b7280" /> Teléfono
                  </label>
                  <Input
                    type="tel"
                    placeholder="0000-0000"
                    maxLength={9}
                    {...register("phoneEmployees", {
                      required: "El teléfono es obligatorio",
                      validate: validatePhone,
                    })}
                    className={`form-input ${
                      errors.phoneEmployees ? "error" : ""
                    }`}
                    disabled={isSubmitting}
                    onChange={(e) => {
                      e.target.value = formatPhone(e.target.value);
                      trigger("phoneEmployees");
                    }}
                  />
                  {errors.phoneEmployees && (
                    <span className="error-text">
                      {errors.phoneEmployees.message}
                    </span>
                  )}
                </div>

                {/* Dirección */}
                <div className="form-group full-width">
                  <label className="form-label">
                    <MapPin size={16} color="#6b7280" /> Dirección
                  </label>
                  <Input
                    type="text"
                    placeholder="Calle, colonia, ciudad"
                    {...register("addressEmployees", {
                      required: "La dirección es obligatoria",
                      minLength: {
                        value: 10,
                        message:
                          "La dirección debe tener al menos 10 caracteres",
                      },
                    })}
                    className={`form-input ${
                      errors.addressEmployees ? "error" : ""
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.addressEmployees && (
                    <span className="error-text">
                      {errors.addressEmployees.message}
                    </span>
                  )}
                </div>

                {/* Contraseña */}
                <div className="form-group full-width">
                  <label className="form-label">
                    <Lock size={16} color="#6b7280" />
                    Contraseña{" "}
                    {employeeToEdit && "(dejar vacío para mantener la actual)"}
                  </label>
                  <Input
                    type="password"
                    placeholder="Mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número"
                    {...register("password", {
                      validate: validatePassword,
                    })}
                    className={`form-input ${errors.password ? "error" : ""}`}
                    disabled={isSubmitting}
                  />
                  {errors.password && (
                    <span className="error-text">
                      {errors.password.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <Button
                type="button"
                onClick={handleClose}
                className="modal-btn cancel-btn"
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="modal-btn submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Guardando..."
                  : employeeToEdit
                  ? "Actualizar Empleado"
                  : "Agregar Empleado"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterEmployees;
