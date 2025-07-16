import React, { useState } from 'react';
import './Products.css';
import BannerProduct from '../../../img/Products/ProductBanner.png';
import BannerPrivate from '../../../components/Private/BannerPrivate/BannerPrivate.jsx';
import AgregarButton from '../../../components/Private/AgregarButton.jsx';
import SearchIcon from '@mui/icons-material/Search';
import Paginacion from '../../../components/Pagination.jsx';
import ListProducts from '../../../components/Private/Products/ListProducts.jsx';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const products = [
    {
      id: 1,
      name: "Bandana con bordado",
      price: "$12.99",
      image: "https://miamorepets.com/cdn/shop/files/hotdog-bandana_800x800_a3e1c23f-df32-470f-a9d7-7648ccc5e743.webp?v=1718037952",
      category: "Bandana",
      festival: "Navidad",
      description: "Bandana de tela lisa con aplicaciones estampadas bordadas, ideal para darle un toque de estilo y personalidad a tu mascota."
    },
    {
      id: 2,
      name: "Bandana con bordado",
      price: "$12.99",
      image: "https://miamorepets.com/cdn/shop/products/aspen-paws_800x800_4ffa4fd4-c88d-4c8e-bc69-8fc49fa97c73.webp?v=1666225626",
      category: "Bandana",
      festival: "San Valentín",
      description: "Bandana de tela lisa con aplicación estampadas bordadas, ideal para darle un toque de estilo y personalidad a tu mascota."
    },
    {
      id: 3,
      name: "Bandana con bordado",
      price: "$12.99",
      image: "https://miamorepets.com/cdn/shop/files/hotdog-bandana_800x800_a3e1c23f-df32-470f-a9d7-7648ccc5e743.webp?v=1718037952",
      category: "Bandana",
      festival: "Navidad",
      description: "Bandana de tela lisa con aplicaciones estampadas bordadas, ideal para darle un toque de estilo y personalidad a tu mascota."
    },
    {
      id: 4,
      name: "Bandana con bordado",
      price: "$12.99",
      image: "https://miamorepets.com/cdn/shop/files/hotdog-bandana_800x800_a3e1c23f-df32-470f-a9d7-7648ccc5e743.webp?v=1718037952",
      category: "Bandana",
      festival: "San Valentín",
      description: "Bandana de tela lisa con aplicación estampadas bordadas, ideal para darle un toque de estilo y personalidad a tu mascota."
    },
    {
      id: 5,
      name: "Bandana con bordado",
      price: "$12.99",
      image: "https://miamorepets.com/cdn/shop/files/hotdog-bandana_800x800_a3e1c23f-df32-470f-a9d7-7648ccc5e743.webp?v=1718037952",
      category: "Bandana",
      festival: "San Valentín",
      description: "Bandana de tela lisa con aplicación estampadas bordadas, ideal para darle un toque de estilo y personalidad a tu mascota."
    }
  ];

   return (
    <>
      <div className="banner-private-container">
        <BannerPrivate
          title="Productos"
          subtitle="Listado de los productos dentro del catálogo"
          mainImage={BannerProduct}
        />
      </div>

      <div className="bandana-container">
        <div className="bandana-header">
          <div className="filter-tags">
            <span className="nueva-cate">+ Agregar Nueva Categoría</span>
            <span className="nueva-fest">+ Agregar Nueva Festividad</span>
          </div>

          <div className="search-actions">
            <div className="search-container">
              <input
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                placeholder="Buscar..."
              />
              <SearchIcon className="search-icon" size={20} />
            </div>
            <div className='agregar-btn-prod'>
            <AgregarButton />
            </div>
          </div>
        </div>

        <ListProducts products={products} />
        <Paginacion />
      </div>
    </>
  );
};

export default Products;