import React, { useState } from 'react';
import { ChevronRight, Filter, ChevronLeft } from 'lucide-react';
import './ChristmasHoliday.css'; // Importar el archivo CSS

const ChristmasPetStore = () => {
  const [selectedFilter, setSelectedFilter] = useState('Por defecto');
  const [showFilters, setShowFilters] = useState(false);

  const products = [
    {
      id: 1,
      name: 'Bandanas navideñas con texto incluido',
      price: 'Desde $7.50',
      image: '/api/placeholder/150/150',
      category: 'bandanas'
    },
    {
      id: 2,
      name: 'Bandanas inspirada en Santa Claus',
      price: 'Desde $8.00',
      image: '/api/placeholder/150/150',
      category: 'bandanas'
    },
    {
      id: 3,
      name: 'Bandanas navideña de crochet',
      price: 'Desde $11.00',
      image: '/api/placeholder/150/150',
      category: 'bandanas'
    },
    {
      id: 4,
      name: 'Bandanas inspirado en un gorro navideño',
      price: 'Desde $9.99',
      image: '/api/placeholder/150/150',
      category: 'bandanas'
    },
    {
      id: 5,
      name: 'Bandanas inspiradas en Santa',
      price: 'Desde $7.00',
      image: '/api/placeholder/150/150',
      category: 'bandanas'
    },
    {
      id: 6,
      name: 'Bandanas navideñas con estampado',
      price: 'Desde $8.00',
      image: '/api/placeholder/150/150',
      category: 'bandanas'
    },
    {
      id: 7,
      name: 'Bandanas navideñas con diseño elaborado',
      price: 'Desde $12.50',
      image: '/api/placeholder/150/150',
      category: 'bandanas'
    },
    {
      id: 8,
      name: 'Bandanas navideñas con bordado',
      price: 'Desde $6.00',
      image: '/api/placeholder/150/150',
      category: 'bandanas'
    }
  ];

  const breadcrumbs = ['Navidad', 'Halloween', 'San Valentín', 'Patria'];

  return (
    <div className="christmas-store">
      {/* Header/Breadcrumbs */}
      <div className="header">
        <div className="breadcrumbs">
          {breadcrumbs.map((item, index) => (
            <React.Fragment key={item}>
              <span className={`breadcrumb-item ${index === 0 ? 'active' : ''}`}>
                {item}
              </span>
              {index < breadcrumbs.length - 1 && (
                <span className="breadcrumb-separator">▸</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero">
        {/* Decorative elements */}
        <div className="hero-decorations">
          <div className="hero-decoration decoration-1"></div>
          <div className="hero-decoration decoration-2"></div>
          <div className="hero-decoration decoration-3"></div>
          <div className="hero-decoration decoration-4"></div>
        </div>
        
        {/* Navigation arrows */}
        <button className="hero-nav-button prev">
          <ChevronLeft size={24} />
        </button>
        <button className="hero-nav-button next">
          <ChevronRight size={24} />
        </button>

        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Navidad</h1>
            <p className="hero-description">
              Lindas y personalizables bandanas para<br />
              tus peluditos con temática navideña
            </p>
            <button className="hero-button">
              Comprar
            </button>
          </div>
          
          {/* Dog image placeholder */}
          <div className="hero-image">
            <div className="hero-image-container">
              <div className="hero-image-inner">
                <span>🐕</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Filters */}
        <div className="filters">
          <div className="filter-controls">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="filter-button"
            >
              <Filter size={16} />
              Filtrar
            </button>
            
            <div className="sort-controls">
              <span>Ordenar por:</span>
              <select 
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="sort-select"
              >
                <option>Por defecto</option>
                <option>Precio: menor a mayor</option>
                <option>Precio: mayor a menor</option>
                <option>Más populares</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <span>🎄</span>
              </div>
              <div className="product-info">
                <h3 className="product-name">
                  {product.name}
                </h3>
                <p className="product-price">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination">
          <div className="pagination-controls">
            <button className="pagination-button">
              Anterior
            </button>
            <span className="pagination-separator">|</span>
            <button className="pagination-button">
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChristmasPetStore;