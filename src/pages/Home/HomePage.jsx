import axios from 'axios'
import { Header } from '../../components/Header'
import { ProductsGrid } from './productsGrid'
import { useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';
import './HomePage.css'
export function HomePage({ cart ,loadCart}) {
  const [searchParams]=useSearchParams();
  const search =searchParams.get('search')
  const [products, setProducts] = useState([]);
  useEffect(() => {
    document.title = "Home";
    const favicon = document.querySelector("link[rel='icon']");
    favicon.href = "/home-favicon.png";
  }, []);

  useEffect(() => {
    const getHomeData = async () => {
     
      let url = "/api/products";
      if(search){
        url=`/api/products?search=${search}`
      }
      const response = await axios.get(url)
      setProducts(response.data);
    };

    getHomeData();

  }, [search])

  return (
    <>
      <Header cart={cart} />
      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  )
}