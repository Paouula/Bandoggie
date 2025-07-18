import React from 'react';
import ProductCard from './ProductCard';
import Pagination from '../Pagination';

const ProductGrid = ({ products }) => {
  return (
    <>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      <Pagination />
    </>
  );
};

export default ProductGrid;