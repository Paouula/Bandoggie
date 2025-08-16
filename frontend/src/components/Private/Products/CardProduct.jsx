import React from 'react';
import './CardProduct.css';
import DeleteButton from '../DeleteButton.jsx';
import EditButton from '../EditButton.jsx';

const CardProduct = ({ product, onEdit, onDelete }) => {


  return (
    <div className="product-card">
      {/* Parte superior: imagen + acciones */}
      <div className="product-top-section">
        <img 
          src={product.image} 
          className="product-image"
        />

        <div className="product-main-info">
          <div className="product-title-actions">
            <h3 className="product-name">{product.nameProduct}</h3>
            <div className="product-actions">
              <EditButton 
                title="Editar los detalles del producto" 
                onClick={() => onEdit(product)} 
              />
              <DeleteButton 
                title="Eliminar el producto" 
                onClick={() => onDelete(product)} 
              />
            </div>
          </div>
          <p className="product-price">{product.price}</p>
        </div>
      </div>

      {/* Parte inferior: descripción y datos*/}
      <div className="product-bottom-section">
        <div className="product-info">
          <div className="info-column">
            <div className="info-row">
              <span className="info-label">Nombre:</span>
              <span className="info-value">{product.nameProduct}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Precio:</span>
              <span className="info-value">{product.price}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Categoría:</span>
              <span className="info-value">{product.idCategory?.nameCategory}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Festividad:</span>
              <span className="info-value">{product.idHolidayProduct?.nameHoliday || 'Valor no disponible'}</span>
            </div>
          </div>

          <div className="info-column">
            <div className="info-row">
              <span className="info-label">Descripción:</span>
            </div>
            <p className="description">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
