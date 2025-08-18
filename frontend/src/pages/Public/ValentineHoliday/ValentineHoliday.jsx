import React, { useState } from 'react';
import Navigation from '../../../components/Public/NavegationHoliday.jsx';
import BannerHoliday from '../../../components/Public/Holiday/BannerHoliday.jsx';
import ProductFilters from '../../../components/Filter.jsx';
import ProductGrid from '../../../components/Public/PublicCardProduct/ProductGridPublic.jsx';
import './ValentineHoliday.css';

// Imágenes de productos
import ProductVH from '../../../img/ValentineHoliday/ProductVH.jpg';
import ProductVH2 from '../../../img/ValentineHoliday/ProductVH2.jpg';
import ProductVH3 from '../../../img/ValentineHoliday/ProductVH3.jpg';
import ProductVH4 from '../../../img/ValentineHoliday/ProductVH4.jpg';
import ProductVH5 from '../../../img/ValentineHoliday/ProductVH5.jpg';
import ProductVH6 from '../../../img/ValentineHoliday/ProductVH6.jpg';
import ProductVH7 from '../../../img/ValentineHoliday/ProductVH7.jpg';
import ProductVH8 from '../../../img/ValentineHoliday/ProductVH8.jpg';

// Imagen del banner
import DogValentine from '../../../img/ValentineHoliday/DogValentine.png';

const ValentinePetStore = () => {
  const [selectedFilter, setSelectedFilter] = useState('Por defecto');
  const [showFilters, setShowFilters] = useState(false);

  const products = [
    {
      id: 1,
      name: 'Bandana con corazones rojos',
      price: 'Desde $7.50',
      image: ProductVH,
      category: 'bandanas'
    },
    {
      id: 2,
      name: 'Bandana "Be My Valentine"',
      price: 'Desde $8.00',
      image: ProductVH2,
      category: 'bandanas'
    },
    {
      id: 3,
      name: 'Bandana rosa con encaje',
      price: 'Desde $11.00',
      image: ProductVH3,
      category: 'bandanas'
    },
    {
      id: 4,
      name: 'Bandana con estampado de amor',
      price: 'Desde $9.99',
      image: ProductVH4,
      category: 'bandanas'
    },
    {
      id: 5,
      name: 'Bandana con mensaje romántico',
      price: 'Desde $7.00',
      image: ProductVH5,
      category: 'bandanas'
    },
    {
      id: 6,
      name: 'Bandana rosada con huellitas',
      price: 'Desde $8.00',
      image: ProductVH6,
      category: 'bandanas'
    },
    {
      id: 7,
      name: 'Bandana estilo carta de amor',
      price: 'Desde $12.50',
      image: ProductVH7,
      category: 'bandanas'
    },
    {
      id: 8,
      name: 'Bandana con ositos y corazones',
      price: 'Desde $6.00',
      image: ProductVH8,
      category: 'bandanas'
    }
  ];

  const breadcrumbs = ['Navidad', 'Halloween', 'San Valentín', 'Patria', 'Año Nuevo', 'Cumpleaños'];

  return (
    <div className="valentine-store">
      <Navigation breadcrumbs={breadcrumbs} />
      
      <BannerHoliday 
        title="San Valentín"
        description="Celebra el amor con nuestras adorables bandanas temáticas para tu peludo. "
        buttonText="Comprar"
        dogImage={DogValentine}
        backgroundColor="#ff4d88"
        textColor="#fff0f5"
        titleColor="#ffffff"
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

export default ValentinePetStore;
