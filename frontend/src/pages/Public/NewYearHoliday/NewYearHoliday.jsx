import React, { useState } from 'react';
import Navigation from '../../../components/Public/NavegationHoliday.jsx';
import BannerHoliday from '../../../components/Public/Holiday/BannerHoliday.jsx';
import ProductFilters from '../../../components/Filter.jsx';
import ProductGrid from '../../../components/Public/PublicCardProduct/ProductGridPublic.jsx';
import './NewYearHoliday.css';

// Imágenes de productos de Año Nuevo
import ProductNY1 from '../../../img/NewYearHoliday/ProductNY1.jpg';
import ProductNY2 from '../../../img/NewYearHoliday/ProductNY2.jpg';
import ProductNY3 from '../../../img/NewYearHoliday/ProductNY3.jpg';
import ProductNY4 from '../../../img/NewYearHoliday/ProductNY4.jpg';
import ProductNY5 from '../../../img/NewYearHoliday/ProductNY5.jpg';
import ProductNY6 from '../../../img/NewYearHoliday/ProductNY6.jpg';
import ProductNY7 from '../../../img/NewYearHoliday/ProductNY7.jpg';
import ProductNY8 from '../../../img/NewYearHoliday/ProductNY8.jpg';

// Imagen del banner
import DogNewYear from '../../../img/NewYearHoliday/DogNewYear.png';

const NewYearPetStore = () => {
  const [selectedFilter, setSelectedFilter] = useState('Por defecto');
  const [showFilters, setShowFilters] = useState(false);

  const products = [
    {
      id: 1,
      name: 'Bandana con fuegos artificiales',
      price: 'Desde $7.50',
      image: ProductNY1,
      category: 'bandanas'
    },
    {
      id: 2,
      name: 'Bandana dorada festiva',
      price: 'Desde $8.00',
      image: ProductNY2,
      category: 'bandanas'
    },
    {
      id: 3,
      name: 'Bandana Feliz Año Nuevo',
      price: 'Desde $11.00',
      image: ProductNY3,
      category: 'bandanas'
    },
    {
      id: 4,
      name: 'Bandana con copas y burbujas',
      price: 'Desde $9.99',
      image: ProductNY4,
      category: 'bandanas'
    },
    {
      id: 5,
      name: 'Bandana negra con dorado',
      price: 'Desde $7.00',
      image: ProductNY5,
      category: 'bandanas'
    },
    {
      id: 6,
      name: 'Bandana con reloj de medianoche',
      price: 'Desde $8.00',
      image: ProductNY6,
      category: 'bandanas'
    },
    {
      id: 7,
      name: 'Bandana brillante edición especial',
      price: 'Desde $12.50',
      image: ProductNY7,
      category: 'bandanas'
    },
    {
      id: 8,
      name: 'Bandana con estrellas doradas',
      price: 'Desde $6.00',
      image: ProductNY8,
      category: 'bandanas'
    }
  ];

  const breadcrumbs = ['Navidad', 'Halloween', 'San Valentín', 'Patria', 'Año Nuevo', 'Cumpleaños'];

  return (
    <div className="newyear-store">
      <Navigation breadcrumbs={breadcrumbs} />
      
      <BannerHoliday 
        title="Año Nuevo"
        description="¡Recibe el nuevo año con estilo! Descubre nuestras bandanas brillantes y festivas para tu mascota."
        buttonText="Comprar"
        dogImage={DogNewYear}
        backgroundColor="#0B132B"
        textColor="#ffffff"
        titleColor="#FFD700"
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

export default NewYearPetStore;
