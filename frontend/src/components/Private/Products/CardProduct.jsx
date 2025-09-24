import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import './CardProduct.css';

const CardProduct = ({ product, onEdit, onDelete }) => {
  
  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Edit clicked for product:', product);
    if (onEdit) {
      onEdit(product);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Delete clicked for product:', product);
    if (onDelete) {
      onDelete(product);
    }
  };

  return (
    <div className="product-card-private">
      {/* Parte superior: imagen */}
      <div className="product-top-section">
        <img 
          src={product.image}
          className="product-image-private"
          alt={product.nameProduct}
        />
      </div>

      {/* Botones debajo de la imagen */}
      <div className="product-actions-btn">
        <button 
          className="btn-action-product edit-product"
          onClick={handleEdit}
          title="Editar producto"
          type="button"
        >
          <Pencil size={18} strokeWidth={2.5} />
        </button>
        <button 
          className="btn-action-product delete-product"
          onClick={handleDelete}
          title="Eliminar producto"
          type="button"
        >
          <Trash2 size={18} strokeWidth={2.5} />
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