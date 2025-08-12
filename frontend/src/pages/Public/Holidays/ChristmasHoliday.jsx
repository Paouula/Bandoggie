import React, { useState } from 'react';
import NavigationHoliday from '../../../components/Public/NavegationHoliday.jsx';
import BannerHoliday from '../../../components/Public/BannerHoliday.jsx';
import ProductFilters from '../../../components/Filter.jsx';
import ProductGrid from '../../../components/Public/ProductGridPublic.jsx';
import './ChristmasHoliday.css';

// Imágenes Products
import ProductsCH from '../../../img/ChristmasHoliday/ProductsCH.png';
import ProductsCH2 from '../../../img/ChristmasHoliday/ProductCH2.png';
import ProductsCH3 from '../../../img/ChristmasHoliday/ProductCH3.png';
import ProductsCH4 from '../../../img/ChristmasHoliday/ProductCH4.png';
import ProductsCH5 from '../../../img/ChristmasHoliday/ProductCH5.png';
import ProductsCH6 from '../../../img/ChristmasHoliday/ProductCH6.png';
import ProductsCH7 from '../../../img/ChristmasHoliday/ProductCH7.png';
import ProductsCH8 from '../../../img/ChristmasHoliday/ProductCH8.png';

const ChristmasPetStore = () => {
  const [selectedFilter, setSelectedFilter] = useState('Por defecto');
  const [showFilters, setShowFilters] = useState(false);

  const products = [
    {
      id: 1,
      name: 'Bandanas navideñas con texto incluido',
      price: 'Desde $7.50',
      image: ProductsCH,
      category: 'bandanas'
    },
    {
      id: 2,
      name: 'Bandanas inspirada en Santa Claus',
      price: 'Desde $8.00',
      image: ProductsCH2,
      category: 'bandanas'
    },
    {
      id: 3,
      name: 'Bandanas navideña de crochet',
      price: 'Desde $11.00',
      image: ProductsCH3,
      category: 'bandanas'
    },
    {
      id: 4,
      name: 'Bandanas inspirado en un gorro navideño',
      price: 'Desde $9.99',
      image: ProductsCH4,
      category: 'bandanas'
    },
    {
      id: 5,
      name: 'Bandanas inspiradas en Santa',
      price: 'Desde $7.00',
      image: ProductsCH5,
      category: 'bandanas'
    },
    {
      id: 6,
      name: 'Bandanas navideñas con estampado',
      price: 'Desde $8.00',
      image: ProductsCH6,
      category: 'bandanas'
    },
    {
      id: 7,
      name: 'Bandanas navideñas con diseño elaborado',
      price: 'Desde $12.50',
      image: ProductsCH7,
      category: 'bandanas'
    },
    {
      id: 8,
      name: 'Bandanas navideñas con bordado',
      price: 'Desde $6.00',
      image: ProductsCH8,
      category: 'bandanas'
    }
  ];

  const breadcrumbs = ['Navidad', 'Halloween', 'San Valentín', 'Días Patrios', 'Año Nuevo', 'Cumpleaños'];

  // Función de naveggación
  const handleNavigate = (item, index) => {
    const pageRoutes = {
      'Navidad': '/christmas-holiday',
      'Halloween': '/halloween-holiday', 
      'San Valentín': '/valentines-holiday',
      'Días Patrios': '/patriotic-holiday',
      'Año Nuevo': '/new-year-holiday',
      'Cumpleaños': '/birthday-holiday'
    };

    const route = pageRoutes[item];
    console.log(`Navegando a: ${item} - Ruta: ${route}`);
    
  };

  return (
    <div className="christmas-store">
      {/* Componente de nav */}
      <NavigationHoliday 
        breadcrumbs={breadcrumbs}
        currentPage="Navidad"
        onNavigate={handleNavigate}
      />
      
      {/* Componente*/}
      <BannerHoliday />
      
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