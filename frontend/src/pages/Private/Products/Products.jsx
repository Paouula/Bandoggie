import React, { useEffect, useState } from 'react';
import './Products.css';
import BannerProduct from '../../../img/Products/ProductBanner.png';
import BannerPrivate from '../../../components/Private/BannerPrivate/BannerPrivate.jsx';
import AgregarButton from '../../../components/Private/AgregarButton.jsx';
import SearchIcon from '@mui/icons-material/Search';
import Paginacion from '../../../components/Pagination.jsx';
import ListProducts from '../../../components/Private/Products/ListProducts.jsx';
import useFetchProducts from '../../../hooks/Products/useFetchProducts.js';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);

  const { handleGetProducts, handleDeleteProducts, handlePutProducts } = useFetchProducts();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await handleGetProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await handleDeleteProducts(id);
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (id, updatedProductData) => {
    try {
      await handlePutProducts(id, updatedProductData);
      setProducts(products.map((p) => (p._id === id ? { ...p, ...updatedProductData } : p)));
    } catch (error) {
      console.error(error);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.nameProduct.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <div className="agregar-btn-prod">
              <AgregarButton />
            </div>
          </div>
        </div>

        <ListProducts products={filteredProducts} onEdit={handleEdit} onDelete={handleDelete} />
        <Paginacion />
      </div>
    </>
  );
};

export default Products;
