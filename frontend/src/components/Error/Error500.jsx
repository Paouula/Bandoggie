import { Home, RefreshCw, AlertTriangle, Wifi } from 'lucide-react';
import './error500.css'


const Error500 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-red-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="relative">
            <div className="text-8xl font-bold text-orange-200 mb-4">
              500
            </div>
            <div className="absolute -top-4 -right-4">
              <AlertTriangle className="w-16 h-16 text-yellow-300" />
            </div>
            <div className="absolute -bottom-2 -left-6 w-12 h-12 bg-red-200 rounded-full opacity-50"></div>
          </div>
        </div>
        
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-700 mb-3">
            Error interno del servidor
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            Algo salió mal en nuestros servidores. Nuestros ingenieros ya están 
            trabajando para solucionarlo. ¡Inténtalo de nuevo en unos minutos!
          </p>
        </div>

        <div className="space-y-3">
          <button className="w-full bg-orange-300 hover:bg-orange-400 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 shadow-md flex items-center justify-center gap-2">
            <RefreshCw size={18} />
            Intentar de nuevo
          </button>
          
          <button className="w-full bg-red-200 hover:bg-red-300 text-gray-700 py-3 px-6 rounded-lg font-medium transition-all duration-300 shadow-md flex items-center justify-center gap-2">
            <Home size={18} />
            Ir al inicio
          </button>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-center space-x-2 text-gray-400">
            <Wifi className="w-4 h-4" />
            <span className="text-xs">Verificando conexión...</span>
          </div>
        </div>

        <div className="mt-6 flex justify-center space-x-2">
          <div className="w-2 h-8 bg-orange-300 rounded"></div>
          <div className="w-2 h-6 bg-yellow-300 rounded"></div>
          <div className="w-2 h-10 bg-red-300 rounded"></div>
          <div className="w-2 h-4 bg-orange-300 rounded"></div>
          <div className="w-2 h-7 bg-yellow-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default Error500;