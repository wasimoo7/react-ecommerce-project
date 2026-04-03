import axios from 'axios';
import { Routes, Route } from 'react-router';
import { useEffect, useState } from 'react';
import { HomePage } from './pages/Home/HomePage';
import { CheckoutPage } from './pages/Checkout/CheckoutPage.jsx';
import { OrdersPage } from './pages/Order/OrdersPage.jsx';
import { TrackingPage } from './pages/TrackingPage.jsx'
import { PageNo } from './pages/PageNo.jsx'
import './App.css'
function App() {
  const [cart, setCart] = useState([]);
  const loadCart = async () => {
    const response = await axios.get('/api/cart-items?expand=product')
    setCart(response.data);
  }
  useEffect(() => {
    loadCart();

  }, [])

  return (
    <Routes>
      <Route path='/' element={<HomePage cart={cart} loadCart={loadCart} />} />
      <Route path='checkout' element={<CheckoutPage cart={cart} loadCart={loadCart} />} />
      <Route path='orders' element={<OrdersPage cart={cart} loadCart={loadCart}/>} />
      <Route
        path="/tracking/:orderId/:productId"
        element={<TrackingPage cart={cart} />}
      />
      <Route path='*' element={<PageNo />} />
    </Routes>


  )
}

export default App
