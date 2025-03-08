import './App.css'
import CartForm from "./features/cart/cartForm/ui/CartForm.tsx";
import ProductDetails from "./features/productDetails/ui/ProductDetails.tsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from "./shared/navigation/Navigation.tsx";
import ProductsList from "./features/productList/ProductsList.tsx";
import OrderForm from "./features/order/orderForm/ui/OrderForm.tsx";

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
        </Routes>
    </Router>
  )
}

export default App;