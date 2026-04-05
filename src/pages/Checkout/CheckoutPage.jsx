import './CheckoutPage.css'
import axios from 'axios'
import { OrderSummary } from './OrderSummary'
import { Checkoutheader } from './CheckoutHeader'
import { PaymentSummary } from './PaymentSummary'
import './checkout-header.css'
import { useEffect, useState, } from 'react';


export function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setpaymentSummary] = useState(null);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      let response = await axios.get(
        '/api/delivery-options?expand=estimatedDeliveryTime')
      setDeliveryOptions(response.data)
      console.log(response.data)
    }
    fetchCheckoutData();


  }, []);

  useEffect(() => {
    const fetchPaymentSummary = async () => {
      let response = await axios.get('/api/payment-summary')
      setpaymentSummary(response.data);
    }
    fetchPaymentSummary()
  }, [cart])

  useEffect(() => {
    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) {
      favicon.href = "/cart-favicon.png";
    }

  }, []);

  return (
    <>
      <title>Checkout</title>

      <Checkoutheader cart={cart} />


      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">

          <OrderSummary cart={cart}
            deliveryOptions={deliveryOptions}
            loadCart={loadCart}
          />

          <PaymentSummary paymentSummary={paymentSummary}
            loadCart={loadCart} />
        </div>

      </div>

    </>

  )
}