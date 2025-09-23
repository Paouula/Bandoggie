// ListProducts.jsx
import React from 'react';
import CardProduct from '../Products/CardProduct.jsx';

const ListProducts = ({ products, onEdit, onDelete }) => {

  
  return (
    <div className="products-grid">
      {products && products.length > 0 ? (
        products.map((product) => (
          <CardProduct 
            key={product._id || product.id}
            product={product}
            onEdit={(prod) => {
              console.log('ListProducts - Edit clicked for:', prod);
              onEdit(prod);
            }}
            onDelete={(prod) => {
              console.log('ListProducts - Delete clicked for:', prod);
              onDelete(prod);
            }}
          />
        ))
      ) : (
        <div className="no-products">
          <p>No hay productos disponibles</p>
        </div>
      )}
    </div>
  );
};

export default ListProducts;