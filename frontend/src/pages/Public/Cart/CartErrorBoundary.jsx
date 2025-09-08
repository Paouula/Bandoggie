import React from 'react';

class CartErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Actualiza el state para mostrar la UI de error
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Puedes registrar el error en un servicio de logging
    console.error('Error en ShoppingCartApp:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // UI de error personalizada
      return (
        <div style={{
          padding: '40px',
          textAlign: 'center',
          backgroundColor: '#f8f9fa',
          borderRadius: '12px',
          margin: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: '#dc3545', marginBottom: '20px' }}>
            ðŸ›’ Error en el Carrito
          </h2>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            Lo sentimos, ocurriÃ³ un error inesperado en el carrito de compras.
          </p>
          
          {/* Mostrar detalles del error solo en desarrollo */}
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details style={{ 
              backgroundColor: '#f8d7da', 
              color: '#721c24', 
              padding: '15px', 
              borderRadius: '6px',
              marginBottom: '20px',
              textAlign: 'left'
            }}>
              <summary style={{ cursor: 'pointer', marginBottom: '10px' }}>
                Ver detalles del error (Solo en desarrollo)
              </summary>
              <pre style={{ fontSize: '12px', overflow: 'auto' }}>
                {this.state.error.toString()}
                <br />
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null, errorInfo: null });
              }}
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Intentar de nuevo
            </button>
            
            <button
              onClick={() => {
                if (this.props.onClose) {
                  this.props.onClose();
                }
              }}
              style={{
                padding: '10px 20px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Cerrar carrito
            </button>
          </div>

          <p style={{ fontSize: '14px', color: '#666', marginTop: '20px' }}>
            Si el problema persiste, por favor contacta al soporte tÃ©cnico.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default CartErrorBoundary;