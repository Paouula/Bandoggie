import React, { useState } from 'react';
import { Camera, X } from 'lucide-react';

export default function EmployeeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    fechaNacimiento: '',
    telefono: '',
    direccion: '',
    dui: '',
    fechaNacimientoRight: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del empleado:', formData);
    // Aquí puedes agregar la lógica para enviar los datos
    setIsOpen(false);
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      email: '',
      fechaNacimiento: '',
      telefono: '',
      direccion: '',
      dui: '',
      fechaNacimientoRight: ''
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    resetForm();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
      >
        Abrir Modal de Empleado
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
            <div className="relative p-8">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 w-8 h-8 flex items-center justify-center"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-8">
                <div className="relative inline-block mb-4">
                  <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-white rounded-full"></div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-colors">
                    <Camera size={16} className="text-white" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Agregar Empleado</h2>
                <p className="text-gray-600 text-sm">Aquí puedes llenar un formulario para crear y registrar un nuevo empleado</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dirección
                    </label>
                    <input
                      type="text"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      DUI
                    </label>
                    <input
                      type="text"
                      name="dui"
                      value={formData.dui}
                      onChange={handleInputChange}
                      className="w-ful p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha de nacimiento
                    </label>
                    <input
                      type="date"
                      name="fechaNacimiento"
                      value={formData.fechaNacimiento}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dirección
                    </label>
                    <input
                      type="text"
                      name="direccion2"
                      value={formData.direccion2}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:sring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha de Nacimiento
                    </label>
                    <input
                      type="date"
                      name="fechaNacimientoRight"
                      value={formData.fechaNacimientoRight}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex justify-center mt-8">
                  <button
                    type="submit"
                    className="bg-orange-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
                  >
                    Agregar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}