import React, { useState } from 'react';
import Navigation from '../../../components/Public/NavegationHoliday.jsx';
import Banner from '../../../components/Public/BannerHoliday.jsx';
import ProductFilters from '../../../components/Filter.jsx';
import ProductGrid from '../../../components/Public/ProductGridPublic.jsx';
import './PatrioticHoliday.css';

// Imágenes de productos 
import ProductPH from '../../../img/PatrioticHoliday/ProductPH.png';


// Imagen del banner
import DogPatriotic from '../../../img/PatrioticHoliday/DogPatriotic.png';

const PatrioticPetStore = () => {
  const [selectedFilter, setSelectedFilter] = useState('Por defecto');
  const [showFilters, setShowFilters] = useState(false);

  const products = [
    {
      id: 1,
      name: 'Bandana con bandera salvadoreña',
      price: 'Desde $7.50',
      image: ProductPH,
      category: 'bandanas'
    },
    {
      id: 2,
      name: 'Bandana azul con escudo nacional',
      price: 'Desde $8.00',
      image: ProductPH,
      category: 'bandanas'
    },
    {
      id: 3,
      name: 'Bandana patriótica bordada',
      price: 'Desde $11.00',
      image: ProductPH,
      category: 'bandanas'
    },
    {
      id: 4,
      name: 'Bandana con frases patrióticas',
      price: 'Desde $9.99',
      image: ProductPH,
      category: 'bandanas'
    },
    {
      id: 5,
      name: 'Bandana con rayas azul y blanco',
      price: 'Desde $7.00',
      image: ProductPH,
      category: 'bandanas'
    },
    {
      id: 6,
      name: 'Bandana de independencia',
      price: 'Desde $8.00',
      image: ProductPH,
      category: 'bandanas'
    },
    {
      id: 7,
      name: 'Bandana con símbolos patrios',
      price: 'Desde $12.50',
      image: ProductPH,
      category: 'bandanas'
    },
    {
      id: 8,
      name: 'Bandana azul cielo edición especial',
      price: 'Desde $6.00',
      image: ProductPH,
      category: 'bandanas'
    }
  ];

  const breadcrumbs = ['Navidad', 'Halloween', 'San Valentín', 'Patria', 'Año Nuevo', 'Cumpleaños'];

  return (
    <div className="patriotic-store">
      <Navigation breadcrumbs={breadcrumbs} />
      
      <Banner 
        title="Días Patrios"
        description="Celebra el orgullo salvadoreño con nuestras bandanas patrióticas para tu mejor amigo"
        buttonText="Comprar"
        dogImage={DogPatriotic}
        textColor="#f5f5f5"
        titleColor="#f5f5f5"
        buttonTextColor="#000000"
      />
      
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

export default PatrioticPetStore;
