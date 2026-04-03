import { Header } from '../components/Header';
import axios from 'axios';
import './TrackingPage.css';
import dayjs from 'dayjs'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

export function TrackingPage({ cart }) {

  const [order, setOrder] = useState(null);


  const { orderId, productId } = useParams();

  // 🔥 Fetch order data
  useEffect(() => {
    axios.get(`/api/orders/${orderId}?expand=products`)
      .then((response) => {
        setOrder(response.data);


      });
  }, [orderId]);

  // 🔥 Favicon change
  useEffect(() => {
    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) {
      favicon.href = "/tracking-favicon.png";
    }
  }, []);

  // 🔥 Jab tak data load nahi hota
  if (!order) {
    return null;
  }


  // 🔥 Specific product find karo
  const orderProduct = order.products.find((item) => {
    return item.product.id === productId;

  });

  const totalDeliveryTimems = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;

  const timePassedMs = dayjs().valueOf() - order.orderTimeMs
  let deliveryPercent = (timePassedMs / totalDeliveryTimems) * 100;

  if (deliveryPercent > 100) {
    deliveryPercent = 100;
  }

  const isPreparing = deliveryPercent < 33 ;
  const isShipped = deliveryPercent >= 33 && deliveryPercent <100;
  const isDelivered = deliveryPercent >= 100;


  return (
    <>
      <title>Tracking</title>

      <Header cart={cart} />


      <div className="tracking-page">
        <div className="order-tracking">
          <a className="back-to-orders-link link-primary" href="/orders">
            View all orders
          </a>

          <div className="delivery-date">
            Arriving on {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
          </div>

          <div className="product-info">
            {orderProduct.product.name}
          </div>

          <div className="product-info">
            Quantity: {orderProduct.quantity}
          </div>

          <img className="product-image" src={orderProduct.product.image} />

          <div className="progress-labels-container">
            <div className={`progress-label ${isPreparing ? 'current-status' : ''} `} >
              Preparing
            </div>
            <div className={`progress-label ${isShipped ? 'current-status' : ''} `}>
              Shipped
            </div>
            <div className={`progress-label ${isDelivered ? 'current-status' : ''} `}>
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar"
              style={{ width: `${deliveryPercent}%` }}></div>
          </div>
        </div>
      </div>

    </>
  )

}