import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import './CardProduct.css';

const CardProduct = ({ product, onEdit, onDelete }) => {
  return (
    <div className="product-card">
      {/* Parte superior: imagen */}
      <div className="product-top-section">
        <img 
          src={product.image}
          className="product-image"
          alt={product.nameProduct}
        />
      </div>

      {/* Botones debajo de la imagen */}
      <div className="product-actions">
        <button 
          className="btn-action edit"
          onClick={() => onEdit && onEdit(product)}
          title="Editar producto"
        >
          <Pencil size={18} color="currentColor" />
        </button>
        <button 
          className="btn-action delete"
          onClick={() => onDelete && onDelete(product)}
          title="Eliminar producto"
        >
          <Trash2 size={18} color="currentColor" />
        </button>
      </div>

      {/* Info principal */}
      <div className="product-main-info">
        <h3 className="product-name">{product.nameProduct}</h3>
        <p className="product-price">${product.price}</p>
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