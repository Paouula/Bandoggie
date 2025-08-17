import React, { useState } from 'react';
import Navigation from '../../../components/Public/NavegationHoliday.jsx';
import BannerHoliday from '../../../components/Public/Holiday/BannerHoliday.jsx';
import ProductFilters from '../../../components/Filter.jsx';
import ProductGrid from '../../../components/Public/Products/ProductGridPublic.jsx';
import './HalloweenHoliday.css';

// Imágenes Products
import ProductHH from '../../../img/HalloweenHoliday/ProductHH.jpg';
import ProductHH2 from '../../../img/HalloweenHoliday/ProductHH2.jpg';
import ProductHH3 from '../../../img/HalloweenHoliday/ProductHH3.jpg';
import ProductHH4 from '../../../img/HalloweenHoliday/ProductHH4.jpg';
import ProductHH5 from '../../../img/HalloweenHoliday/ProductHH5.jpg';
import ProductHH6 from '../../../img/HalloweenHoliday/ProductHH6.jpg';
import ProductHH7 from '../../../img/HalloweenHoliday/ProductHH7.jpg';
import ProductHH8 from '../../../img/HalloweenHoliday/ProductHH8.jpg';

// Img Banner
import DogHalloween from '../../../img/HalloweenHoliday/DogHalloween.png';

const HalloweenPetStore = () => {
  const [selectedFilter, setSelectedFilter] = useState('Por defecto');
  const [showFilters, setShowFilters] = useState(false);

  const products = [
    {
      id: 1,
      name: 'Bandana con calabazas y fantasmas',
      price: 'Desde $7.50',
      image: ProductHH,
      category: 'bandanas'
    },
    {
      id: 2,
      name: 'Bandana estilo murciélago',
      price: 'Desde $8.00',
      image: ProductHH2,
      category: 'bandanas'
    },
    {
      id: 3,
      name: 'Bandana de telaraña morada',
      price: 'Desde $11.00',
      image: ProductHH3,
      category: 'bandanas'
    },
    {
      id: 4,
      name: 'Bandana con gorro de bruja',
      price: 'Desde $9.99',
      image: ProductHH4,
      category: 'bandanas'
    },
    {
      id: 5,
      name: 'Bandana "Truco o Trato"',
      price: 'Desde $7.00',
      image: ProductHH5,
      category: 'bandanas'
    },
    {
      id: 6,
      name: 'Bandana con estampado de esqueletos',
      price: 'Desde $8.00',
      image: ProductHH6,
      category: 'bandanas'
    },
    {
      id: 7,
      name: 'Bandana de calaveras y rosas negras',
      price: 'Desde $12.50',
      image: ProductHH7,
      category: 'bandanas'
    },
    {
      id: 8,
      name: 'Bandana con bordado de gato negro',
      price: 'Desde $6.00',
      image: ProductHH8,
      category: 'bandanas'
    }
  ];

  const breadcrumbs = ['Navidad', 'Halloween', 'San Valentín', 'Patria', 'Año Nuevo', 'Cumpleaños'];

  return (
    <div className="halloween-store">
      <Navigation breadcrumbs={breadcrumbs} />
      
      <BannerHoliday 
        title="Halloween"
        description="¡Dale un toque aterrador y adorable a tu peludo con nuestras bandanas de Halloween!"
        buttonText="Comprar"
        dogImage={DogHalloween}
        backgroundColor="#D371D8"
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

export default HalloweenPetStore;
