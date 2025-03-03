import './App.css'
import CartForm from "./features/cart/cartForm/ui/CartForm.tsx";
import SelectedProductCard from "./features/productCard/SelectedProductCard.tsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import cartImage from "./assets/Ring.jpg"
// import {useState} from "react";
import Navigation from "./shared/navigation/Navigation.tsx";
// import IItemInCart from "./shared/types/IItemInCart.ts";
import ProductsList from "./features/productList/ProductsList.tsx";

function App() {

    return (
    <Router>
        <Navigation/>
        <Routes>
            <Route
                path="/product/:slug"
                element={
                    <SelectedProductCard/>
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
        </Routes>
    </Router>
  )
}

export default App;