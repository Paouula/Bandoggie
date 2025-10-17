import React, { useEffect, useState } from "react";
import './MainPage.css';
import { ShoppingCart, Package } from "lucide-react";
import ListOrders from "../../../components/Private/MainPage/ListOrderMainPage.jsx";
import BannerMainPage from '../../../img/BannerPrivate/MainPageBanner.png';
import BannerPrivate from '../../../components/Private/BannerPrivate/BannerPrivate.jsx';
import LineaDivisora from '../../../components/LineaDivisora.jsx';
import axios from "axios";
import { Toaster } from 'react-hot-toast';

const OrdersPage = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const res = await axios.get("https://bandoggie-production.up.railway.app/api/cart"); 
        setCarts(res.data);
      } catch (err) {
        console.error("Error al traer los carts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCarts();
  }, []);

  if (loading) return <p>Cargando pedidos...</p>;

    const handleMinoristasClick = () => {
    console.log('Navegar a página de orders');
  };

  return (
     <>
      <Toaster position="top-right" />
      <BannerPrivate
        title="¡Bienvenida!"
        subtitle="¿Qué deseas hacer hoy?"
        mainImage={BannerMainPage}
      />
    <LineaDivisora></LineaDivisora>

     <div className="page-container">
        <h1 className="section-title-Main">Algunos pedidos recientes...</h1>

        <div className="orders-section-Main">
          <div className="section-header-Main">
            <button onClick={handleMinoristasClick} className="btn-minoristas">
              <ShoppingCart /> Pedidos
            </button>
          </div>

    <div>
      <ListOrders carts={carts} onView={(id) => console.log("Ver pedido", id)} />
    </div>
    </div>
    </div>
    </>
  );
};

export default OrdersPage;
