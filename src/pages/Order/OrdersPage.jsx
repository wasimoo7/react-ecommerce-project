import './OrdersPage.css';
import axios from 'axios'

import { OrdersGrid } from "./OrdersGrid.jsx"

import { useEffect, useState, Fragment } from 'react';
import { OrderHeader } from './OrderHeader';


export function OrdersPage({ cart,loadCart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const fetchOrdersData = async () => {
      const response = await axios.get('/api/orders?expand=products')

      setOrders(response.data);
     

    }
    fetchOrdersData()


  }, [])


  useEffect(() => {
  
    const favicon = document.querySelector("link[rel='icon']");
    favicon.href = "/orders-favicon.png";
  }, []);

  return (
    <>
      <title>Orders</title>



      <OrderHeader cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrdersGrid orders={orders} loadCart={loadCart} />

      </div>


    </>
  )

}