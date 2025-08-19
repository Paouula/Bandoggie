import { Home, ArrowLeft } from 'lucide-react';
import './error404.css'

const Error404 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="relative">
            <div className="text-8xl font-bold text-purple-200 mb-4">
              404
            </div>
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-pink-200 rounded-full opacity-60"></div>
            <div className="absolute -bottom-2 -left-6 w-16 h-16 bg-blue-200 rounded-full opacity-40"></div>
          </div>
        </div>
        
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-700 mb-3">
            ¡Ups! Página no encontrada
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            La página que buscas ha decidido tomarse unas vacaciones. 
            Tal vez se fue a explorar el espacio cibernético.
          </p>
        </div>

        <div className="space-y-3">
          <button className="w-full bg-purple-300 hover:bg-purple-400 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 shadow-md flex items-center justify-center gap-2">
            <Home size={18} />
            Volver al inicio
          </button>
          
          <button className="w-full bg-blue-200 hover:bg-blue-300 text-gray-700 py-3 px-6 rounded-lg font-medium transition-all duration-300 shadow-md flex items-center justify-center gap-2">
            <ArrowLeft size={18} />
            Página anterior
          </button>
        </div>

        <div className="mt-8 flex justify-center space-x-2">
          <div className="w-3 h-3 bg-purple-300 rounded-full"></div>
          <div className="w-3 h-3 bg-pink-300 rounded-full"></div>
          <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Error404;