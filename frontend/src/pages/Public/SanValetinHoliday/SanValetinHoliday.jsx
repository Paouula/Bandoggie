import React, { useState } from 'react';
import Navigation from '../../../components/NavegationHoliday.jsx';
import Banner from '../../../components/BannerHoliday.jsx';
import ProductFilters from '../../../components/Filter.jsx';
import ProductGrid from '../../../components/ProductGrid.jsx';
import './ChristmasHoliday.css';

// Imágenes Products
import ProductHH from '../../../img/HalloweenHoliday/ProductHH.png';
import ProductHH2 from '../../../img/HalloweenHoliday/ProductHH2.png';
import ProductHH3 from '../../../img/HalloweenHoliday/ProductHH3.png';
import ProductHH4 from '../../../img/HalloweenHoliday/ProductHH4.png';
import ProductHH5 from '../../../img/HalloweenHoliday/ProductHH5.png';
import ProductHH6 from '../../../img/HalloweenHoliday/ProductHH6.png';
import ProductHH7 from '../../../img/HalloweenHoliday/ProductHH7.png';
import ProductHH8 from '../../../img/HalloweenHoliday/ProductHH8.png';

const ChristmasPetStore = () => {
  const [selectedFilter, setSelectedFilter] = useState('Por defecto');
  const [showFilters, setShowFilters] = useState(false);

  const products = [
    {
      id: 1,
      name: 'Bandanas navideñas con texto incluido',
      price: 'Desde $7.50',
      image: ProductHH,
      category: 'bandanas'
    },
    {
      id: 2,
      name: 'Bandanas inspirada en Santa Claus',
      price: 'Desde $8.00',
      image: ProductHH2,
      category: 'bandanas'
    },
    {
      id: 3,
      name: 'Bandanas navideña de crochet',
      price: 'Desde $11.00',
      image: ProductHH3,
      category: 'bandanas'
    },
    {
      id: 4,
      name: 'Bandanas inspirado en un gorro navideño',
      price: 'Desde $9.99',
      image: ProductHH4,
      category: 'bandanas'
    },
    {
      id: 5,
      name: 'Bandanas inspiradas en Santa',
      price: 'Desde $7.00',
      image: ProductHH5,
      category: 'bandanas'
    },
    {
      id: 6,
      name: 'Bandanas navideñas con estampado',
      price: 'Desde $8.00',
      image: ProductHH6,
      category: 'bandanas'
    },
    {
      id: 7,
      name: 'Bandanas navideñas con diseño elaborado',
      price: 'Desde $12.50',
      image: ProductHH7,
      category: 'bandanas'
    },
    {
      id: 8,
      name: 'Bandanas navideñas con bordado',
      price: 'Desde $6.00',
      image: ProductHH8,
      category: 'bandanas'
    }
  ];

  const breadcrumbs = ['Navidad', 'Halloween', 'San Valentín', 'Patria', 'Año Nuevo', 'Cumpleaños'];

  return (
    <div className="christmas-store">
      <Navigation breadcrumbs={breadcrumbs} />
      
      <Banner />
      
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

export default ChristmasPetStore;