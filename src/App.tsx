import './App.css'
import CartForm from "./features/cart/cartForm/ui/CartForm.tsx";
import ProductDetails from "./features/productDetails/ui/ProductDetails.tsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from "./shared/navigation/Navigation.tsx";
import ProductsList from "./features/productList/ProductsList.tsx";
import OrderForm from "./features/order/orderForm/ui/OrderForm.tsx";
import About from "./features/about/About.tsx";

function App() {

    return (
    <Router>
        <Navigation/>
        <Routes>
            <Route
                path="/product/:slug"
                element={
                    <ProductDetails/>
            }/>
            <Route
                path="/"
                element={
                    <ProductsList/>
            } />
            <Route
                path="/cart"
                element={
                    <CartForm/>
                }/>
            <Route
                path="/order"
                element={
                    <OrderForm/>
                }/>
            <Route
                path="/о-нас"
                element={
                    <About/>
                }/>
        </Routes>
    </Router>
  )
}

export default App;