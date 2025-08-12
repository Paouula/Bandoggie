import React, { useState } from 'react';
import ProductFilters from '../../../components/Filter.jsx';
import ProductGrid from '../../../components/Public/ProductGridPublic.jsx';

//Import de las imagenes de los collares
import Necklaces1 from '../../../img/Necklaces/Necklaces.png';
import Necklaces2 from '../../../img/Necklaces/Necklaces2.png';
import Necklaces3 from '../../../img/Necklaces/Necklaces3.png';
import Necklaces4 from '../../../img/Necklaces/Necklaces4.png';
import Necklaces5 from '../../../img/Necklaces/Necklaces5.png';
import Necklaces6 from '../../../img/Necklaces/Necklaces6.png';
import Necklaces7 from '../../../img/Necklaces/Necklaces7.png';
import Necklaces8 from '../../../img/Necklaces/Necklaces8.png';
import Necklaces9 from '../../../img/Necklaces/Necklaces9.png';
import Necklaces10 from '../../../img/Necklaces/Necklaces10.png';


const Necklaces = () => {
  const [selectedFilter, setSelectedFilter] = useState('Por defecto');
  const [showFilters, setShowFilters] = useState(false);

  const products = [
    {
      id: 1,
      name: 'Bandanas navideñas con texto incluido',
      price: 'Desde $7.50',
      image: Necklaces1,
      category: 'necklaces'
    },
    {
      id: 2,
      name: 'Bandana inspirada en Santa Claus',
      price: 'Desde $8.00',
      image: Necklaces2,
      category: 'necklaces'
    },
    {
      id: 3,
      name: 'Bandana navideña de crochet',
      price: 'Desde $11.00',
      image: Necklaces3,
      category: 'necklaces'
    },
    {
      id: 4,
      name: 'Bandana inspirado en un gorro navideño',
      price: 'Desde $9.99',
      image: Necklaces4,
      category: 'necklaces'
    },
    {
      id: 5,
      name: 'Bandana navideña con texto incluido',
      price: 'Desde $7.50',
      image: Necklaces5,
      category: 'necklaces'
    },
    {
      id: 6,
      name: 'Bandana inspirada en Santa Claus',
      price: 'Desde $8.00',
      image: Necklaces6,
      category: 'necklaces'
    },
    {
      id: 7,
      name: 'Bandana navideña de crochet',
      price: 'Desde $11.00',
      image: Necklaces7,
      category: 'necklaces'
    },
    {
      id: 8,
      name: 'Bandana inspirado en un gorro navideño',
      price: 'Desde $9.99',
      image: Necklaces8,
      category: 'necklaces'
    },
    {
      id: 9,
      name: 'Bandana navideña con texto incluido',
      price: 'Desde $7.50',
      image: Necklaces9,
      category: 'necklaces'
    },
    {
      id: 10,
      name: 'Bandana inspirada en Santa Claus',
      price: 'Desde $8.00',
      image: Necklaces10,
      category: 'necklaces'
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

export default Necklaces;