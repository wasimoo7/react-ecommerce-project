import { formatMoney } from '../../utils/money';
import dayjs from 'dayjs'
import { Fragment } from 'react';
import axios from 'axios';

import { Link } from 'react-router';

export function OrdersGrid({ orders, loadCart }) {
  

  return (
    <div className="orders-grid">
      {orders.map((order) => {

        return (
          <div key={order.id} className="order-container">

            <div className="order-header">
              <div className="order-header-left-section">
                <div className="order-date">
                  <div className="order-header-label">Order Placed:</div>
                  <div className="order-header-label" >{dayjs(order.orderTimeMs).format('MMM D')}</div>
                </div>
                <div className="order-total">
                  <div className="order-header-label">Total:</div>
                  <div className="order-header-label">{formatMoney(order.totalCostCents)}</div>
                </div>
              </div>

              <div className="order-header-right-section">
                <div className="order-header-label">Order ID:</div>
                <div className="order-header-label">{order.id}</div>
              </div>
            </div>

            <div className="order-details-grid">

              {order.products.map((orderproduct) => {
              

                const addToCart = async () => {
                  await axios.post('/api/cart-items', {
                    productId: orderproduct.product.id,
                    quantity: 1

                  });
                  await loadCart();
                }

                return (
                  <Fragment key={orderproduct.product.id}>
                    <div className="product-image-container">
                      <img src={orderproduct.product.image} />
                    </div>

                    <div className="product-details">
                      <div className="product-name">
                        {orderproduct.product.name}
                      </div>
                      <div className="product-delivery-date">
                        Arriving on: {dayjs(orderproduct.estimatedDeliveryTimeMs).format('MMMM D')}
                      </div>
                      <div className="product-quantity">
                        Quantity: {orderproduct.quantity}
                        

                      </div>
                      <button className="buy-again-button button-primary">
                        <img className="buy-again-icon" src="images/icons/buy-again.png" />
                        <span className="buy-again-message" onClick={addToCart}>Add to Cart</span>
                      </button>
                    </div>

                    <div className="product-actions">
                      <Link to={`/tracking/${order.id}/${orderproduct.product.id}`}>
                        Track package
                      </Link>
                    </div>
                  </Fragment >
                )

              })}



            </div>
          </div>

        )
      })}

    </div>
  )
}