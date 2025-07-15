import React from 'react';
import { Filter } from 'lucide-react';

const ProductFilters = ({ 
  selectedFilter, 
  setSelectedFilter, 
  showFilters, 
  setShowFilters 
}) => {
  return (
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
          <span className="sort-label">Ordenar por:</span>
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
  );
};

export default ProductFilters;