import './App.css'
import CartForm from "./features/cart/cartForm/ui/CartForm.tsx";
import ProductDetails from "./features/productDetails/ui/ProductDetails.tsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from "./shared/navigation/Navigation.tsx";
import ProductsList from "./features/productList/ui/ProductsList.tsx";
import OrderForm from "./features/order/orderForm/ui/OrderForm.tsx";
import AboutPage from "./features/about/AboutPage.tsx";
import DeliveryAndPaymentPage from "./features/deliveryAndPayment/DeliveryAndPaymentPage.tsx";

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
                    <AboutPage/>
                }/>
            <Route
                path="/доставка-и-оплата"
                element={
                    <DeliveryAndPaymentPage/>
                }/>
        </Routes>
    </Router>
  )
}

export default App;