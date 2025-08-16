import React, { useState } from 'react';
import Navigation from '../../../components/Public/NavegationHoliday.jsx';
import Banner from '../../../components/Public/BannerHoliday.jsx';
import ProductFilters from '../../../components/Filter.jsx';
import ProductGrid from '../../../components/Public/ProductGridPublic.jsx';
import './BirthdayHoliday.css';

// Imágenes de productos de cumpleaños
import ProductBD1 from '../../../img/BirthdayHoliday/ProductBD1.jpg';
import ProductBD2 from '../../../img/BirthdayHoliday/ProductBD2.jpg';
import ProductBD3 from '../../../img/BirthdayHoliday/ProductBD3.jpg';
import ProductBD4 from '../../../img/BirthdayHoliday/ProductBD4.jpg';
import ProductBD5 from '../../../img/BirthdayHoliday/ProductBD5.jpg';
import ProductBD6 from '../../../img/BirthdayHoliday/ProductBD6.jpg';
import ProductBD7 from '../../../img/BirthdayHoliday/ProductBD7.jpg';
import ProductBD8 from '../../../img/BirthdayHoliday/ProductBD8.jpg';

// Imagen del banner
import DogBirthday from '../../../img/BirthdayHoliday/DogBirthday.png';

const BirthdayPetStore = () => {
  const [selectedFilter, setSelectedFilter] = useState('Por defecto');
  const [showFilters, setShowFilters] = useState(false);

  const products = [
    {
      id: 1,
      name: 'Bandana con globos de colores',
      price: 'Desde $7.50',
      image: ProductBD1,
      category: 'bandanas'
    },
    {
      id: 2,
      name: 'Bandana pastel con velitas',
      price: 'Desde $8.00',
      image: ProductBD2,
      category: 'bandanas'
    },
    {
      id: 3,
      name: 'Bandana cumpleaños feliz',
      price: 'Desde $11.00',
      image: ProductBD3,
      category: 'bandanas'
    },
    {
      id: 4,
      name: 'Bandana con confeti brillante',
      price: 'Desde $9.99',
      image: ProductBD4,
      category: 'bandanas'
    },
    {
      id: 5,
      name: 'Bandana temática fiesta de cumpleaños',
      price: 'Desde $7.00',
      image: ProductBD5,
      category: 'bandanas'
    },
    {
      id: 6,
      name: 'Bandana "Hoy es mi día"',
      price: 'Desde $8.00',
      image: ProductBD6,
      category: 'bandanas'
    },
    {
      id: 7,
      name: 'Bandana con sombrerito de fiesta',
      price: 'Desde $12.50',
      image: ProductBD7,
      category: 'bandanas'
    },
    {
      id: 8,
      name: 'Bandana de colores pastel con estrellas',
      price: 'Desde $6.00',
      image: ProductBD8,
      category: 'bandanas'
    }
  ];

  const breadcrumbs = ['Navidad', 'Halloween', 'San Valentín', 'Patria', 'Año Nuevo', 'Cumpleaños'];

  return (
    <div className="birthday-store">
      <Navigation breadcrumbs={breadcrumbs} />

      <Banner 
        title="¡Feliz Cumpleaños!"
        description="Celebra el día más especial de tu mascota con nuestras bandanas llenas de color y alegría."
        buttonText="Comprar"
        dogImage={DogBirthday}
        backgroundColor="#FFC0CB"
        textColor="#4b0082"
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

export default BirthdayPetStore;
