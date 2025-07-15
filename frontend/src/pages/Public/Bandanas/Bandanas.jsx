import React, { useState } from 'react';
import ProductFilters from '../../../components/Filter.jsx';
import ProductGrid from '../../../components/ProductGrid.jsx';
import './Bandanas.css';

// Imágenes Products - Bandanas Navideñas
import ProductCH from '../../../img/Bandanas/banada7.png';

const Bandanas = () => {
  const [selectedFilter, setSelectedFilter] = useState('Por defecto');
  const [showFilters, setShowFilters] = useState(false);

  const products = [
    {
      id: 1,
      name: 'Bandana navideña con texto incluido',
      price: 'Desde $7.50',
      image: ProductCH,
      category: 'bandanas'
    },
    {
      id: 2,
      name: 'Bandana inspirada en Santa Claus',
      price: 'Desde $8.00',
      image: ProductCH,
      category: 'bandanas'
    },
    {
      id: 3,
      name: 'Bandana navideña de crochet',
      price: 'Desde $11.00',
      image: ProductCH,
      category: 'bandanas'
    },
    {
      id: 4,
      name: 'Bandana inspirado en un gorro navideño',
      price: 'Desde $9.99',
      image: ProductCH,
      category: 'bandanas'
    },
    {
      id: 5,
      name: 'Bandana navideña con texto incluido',
      price: 'Desde $7.50',
      image: ProductCH,
      category: 'bandanas'
    },
    {
      id: 6,
      name: 'Bandana inspirada en Santa Claus',
      price: 'Desde $8.00',
      image: ProductCH,
      category: 'bandanas'
    },
    {
      id: 7,
      name: 'Bandana navideña de crochet',
      price: 'Desde $11.00',
      image: ProductCH,
      category: 'bandanas'
    },
    {
      id: 8,
      name: 'Bandana inspirado en un gorro navideño',
      price: 'Desde $9.99',
      image: ProductCH,
      category: 'bandanas'
    },
    {
      id: 9,
      name: 'Bandana navideña con texto incluido',
      price: 'Desde $7.50',
      image: ProductCH,
      category: 'bandanas'
    },
    {
      id: 10,
      name: 'Bandana inspirada en Santa Claus',
      price: 'Desde $8.00',
      image: ProductCH,
      category: 'bandanas'
    },
    {
      id: 11,
      name: 'Bandana navideña de crochet',
      price: 'Desde $11.00',
      image: ProductCH,
      category: 'bandanas'
    },
    {
      id: 12,
      name: 'Bandana inspirado en un gorro navideño',
      price: 'Desde $9.99',
      image: ProductCH,
      category: 'bandanas'
    }
  ];

  const breadcrumbs = ['Navidad', 'Halloween', 'San Valentín', 'Patria', 'Año Nuevo', 'Cumpleaños'];

  return (
    <div className="christmas-store">
      
      <div className="main-content">
        <ProductFilters 
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        />
        
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default Bandanas;