import React, { useState } from 'react';
import ProductGrid from '../../../components/ProductGrid.jsx';

//Import de las imagenes de las bandanas
import Bandanas from '../../../img/Bandanas/bandanas.png';
import Bandanas2 from '../../../img/Bandanas/bandanas2.png';
import Bandanas3 from '../../../img/Bandanas/bandanas3.png';
import Bandanas4 from '../../../img/Bandanas/bandanas4.png';
import Bandanas5 from '../../../img/Bandanas/bandanas5.png';
import Bandanas6 from '../../../img/Bandanas/bandanas6.png';
import Bandanas7 from '../../../img/Bandanas/bandanas7.png';
import Bandanas8 from '../../../img/Bandanas/bandanas8.png';
import Bandanas9 from '../../../img/Bandanas/bandanas9.png';
import Bandanas10 from '../../../img/Bandanas/bandanas10.png';
import Bandanas11 from '../../../img/Bandanas/bandanas11.png';
import Bandanas12 from '../../../img/Bandanas/bandanas12.png';


const Bandanas = () => {
  const [selectedFilter, setSelectedFilter] = useState('Por defecto');
  const [showFilters, setShowFilters] = useState(false);

  const products = [
    {
      id: 1,
      name: 'Bandana navideña con texto incluido',
      price: 'Desde $7.50',
      image: Bandanas,
      category: 'bandanas'
    },
    {
      id: 2,
      name: 'Bandana inspirada en Santa Claus',
      price: 'Desde $8.00',
      image: Bandanas2,
      category: 'bandanas'
    },
    {
      id: 3,
      name: 'Bandana navideña de crochet',
      price: 'Desde $11.00',
      image: Bandanas3,
      category: 'bandanas'
    },
    {
      id: 4,
      name: 'Bandana inspirado en un gorro navideño',
      price: 'Desde $9.99',
      image: Bandanas4,
      category: 'bandanas'
    },
    {
      id: 5,
      name: 'Bandana navideña con texto incluido',
      price: 'Desde $7.50',
      image: Bandanas5,
      category: 'bandanas'
    },
    {
      id: 6,
      name: 'Bandana inspirada en Santa Claus',
      price: 'Desde $8.00',
      image: Bandanas6,
      category: 'bandanas'
    },
    {
      id: 7,
      name: 'Bandana navideña de crochet',
      price: 'Desde $11.00',
      image: Bandanas7,
      category: 'bandanas'
    },
    {
      id: 8,
      name: 'Bandana inspirado en un gorro navideño',
      price: 'Desde $9.99',
      image: Bandanas8,
      category: 'bandanas'
    },
    {
      id: 9,
      name: 'Bandana navideña con texto incluido',
      price: 'Desde $7.50',
      image: Bandanas9,
      category: 'bandanas'
    },
    {
      id: 10,
      name: 'Bandana inspirada en Santa Claus',
      price: 'Desde $8.00',
      image: Bandanas10,
      category: 'bandanas'
    },
    {
      id: 11,
      name: 'Bandana navideña de crochet',
      price: 'Desde $11.00',
      image: Bandanas11,
      category: 'bandanas'
    },
    {
      id: 12,
      name: 'Bandana inspirado en un gorro navideño',
      price: 'Desde $9.99',
      image: Bandanas12,
      category: 'bandanas'
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

export default Bandanas;