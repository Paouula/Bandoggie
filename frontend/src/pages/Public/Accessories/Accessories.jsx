import React, { useState } from 'react';
import ProductFilters from '../../../components/Filter.jsx';
import ProductGrid from '../../../components/Public/Products/ProductGridPublic.jsx';

//Import de las imagenes de los accesorios
import Accessories1 from '../../../img/Accessories/Accessories.png';
import Accessories2 from '../../../img/Accessories/Accessories2.png';
import Accessories3 from '../../../img/Accessories/Accessories3.png';
import Accessories4 from '../../../img/Accessories/Accessories4.png';
import Accessories5 from '../../../img/Accessories/Accessories5.png';
import Accessories6 from '../../../img/Accessories/Accessories6.png';
import Accessories7 from '../../../img/Accessories/Accessories7.png';
import Accessories8 from '../../../img/Accessories/Accessories8.png';
import Accessories9 from '../../../img/Accessories/Accessories9.png';
import Accessories10 from '../../../img/Accessories/Accessories10.png';
import Accessories11 from '../../../img/Accessories/Accessories11.png';
import Accessories12 from '../../../img/Accessories/Accessories12.png';


const Accessories = () => {
  const [selectedFilter, setSelectedFilter] = useState('Por defecto');
  const [showFilters, setShowFilters] = useState(false);

  const products = [
    {
      id: 1,
      name: 'Bandana navideña con texto incluido',
      price: 'Desde $7.50',
      image: Accessories1,
      category: 'accessories'
    },
    {
      id: 2,
      name: 'Bandana inspirada en Santa Claus',
      price: 'Desde $8.00',
      image: Accessories2,
      category: 'accessories'
    },
    {
      id: 3,
      name: 'Bandana navideña de crochet',
      price: 'Desde $11.00',
      image: Accessories3,
      category: 'accessories'
    },
    {
      id: 4,
      name: 'Bandana inspirado en un gorro navideño',
      price: 'Desde $9.99',
      image: Accessories4,
      category: 'accessories'
    },
    {
      id: 5,
      name: 'Bandana navideña con texto incluido',
      price: 'Desde $7.50',
      image: Accessories5,
      category: 'accessories'
    },
    {
      id: 6,
      name: 'Bandana inspirada en Santa Claus',
      price: 'Desde $8.00',
      image: Accessories6,
      category: 'accessories'
    },
    {
      id: 7,
      name: 'Bandana navideña de crochet',
      price: 'Desde $11.00',
      image: Accessories7,
      category: 'accessories'
    },
    {
      id: 8,
      name: 'Bandana inspirado en un gorro navideño',
      price: 'Desde $9.99',
      image: Accessories8,
      category: 'accessories'
    },
    {
      id: 9,
      name: 'Bandana navideña con texto incluido',
      price: 'Desde $7.50',
      image: Accessories9,
      category: 'accessories'
    },
    {
      id: 10,
      name: 'Bandana inspirada en Santa Claus',
      price: 'Desde $8.00',
      image: Accessories10,
      category: 'accessories'
    },
    {
      id: 11,
      name: 'Bandana navideña de crochet',
      price: 'Desde $11.00',
      image: Accessories11,
      category: 'accessories'
    },
    {
      id: 12,
      name: 'Bandana inspirado en un gorro navideño',
      price: 'Desde $9.99',
      image: Accessories12,
      category: 'accessories'
    }
  ];

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

export default Accessories;