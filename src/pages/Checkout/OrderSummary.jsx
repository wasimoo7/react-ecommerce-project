import dayjs from 'dayjs'
import axios from 'axios'
import { formatMoney } from '../../utils/money'
import { DeliveryOptions } from './DeliveryOption'

export function OrderSummary({ cart, deliveryOptions, loadCart }) {

  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 && cart.map((cartItem) => {

        const selectedDeliveryOption = deliveryOptions
          .find((deliveryOption) => {
            return deliveryOption.id === cartItem.deliveryOptionId;
          })

        const deleteCartItem = async () => {
          await axios.delete(`/api/cart-items/${cartItem.productId}`)
          await loadCart()
        }

        const decreaseQuantity = async () => {
          if (cartItem.quantity === 1) return;
          await axios.put(`/api/cart-items/${cartItem.productId}`, {
            quantity: cartItem.quantity - 1,
          });
          await loadCart();
        }

        const increaseQuantity = async () => {
          await axios.put(`/api/cart-items/${cartItem.productId}`, {
            quantity: cartItem.quantity + 1,
          });
          await loadCart()
        }

        return (
          <div className="cart-item-container" key={cartItem.product.id}>
            <div className="delivery-date">
              Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}

            </div>
            <div className="cart-item-details-grid">
              <img className="product-image"
                src={cartItem.product.image} 
              />

              <div className="cart-item-details">
                <div className="product-name">
                  {cartItem.product.name}
                </div>
                <div className="product-price">
                  {formatMoney(cartItem.product.priceCents)}
                </div>
                <div className="product-quantity">
                  <button className="decrease-quantity-link link-primary" onClick={decreaseQuantity}>
                    -
                  </button>

                  <span>
                    Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                  </span>
                  <button className="update-quantity-link link-primary" onClick={increaseQuantity}>
                    +
                  </button>
                  <span className="delete-quantity-link link-primary" onClick={deleteCartItem}>
                    Delete
                  </span>
                </div>
              </div>

              <DeliveryOptions deliveryOptions={deliveryOptions}
                cartItem={cartItem}
                loadCart={loadCart}
              />

            </div>
          </div>

        )

      })}

    </div>


  )

}