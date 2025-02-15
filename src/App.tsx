import './App.css'
import ProductPage from "@/pages/ProductPage.tsx";
import CartPage from "@/pages/CartPage.tsx";
import CartForm from "@/features/cart/CartForm.tsx";
import ProductCard from "@/features/productCard/ProductCard.tsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import cartImage from "@assets/Ring.jpg"
import {useState} from "react";
import Navigation from "@shared/navigation/Navigation.tsx";

function App() {
    const initialProduct = {
        tags: {
            item: "Колько",
            collection: "коллекция chiaro · scuro",
            article : "11002",
        },
        title: "Вращение судьбы",
        price: "26 100 ₽",
        material: "Серебро 925 пробы",
        stone: "Сибирский нефрит, кубический циркон",
        possibleSizes: ["16", "16,5", "17", "17,5", "18", "18,5", "19"],
        textDescription: "Это кольцо-первертыш. Оно подсказывает, как управлять своей энергией.\n" +
            "Одна часть  — камень, вторая — позолоченное серебро с орнаментом  и цирконом.\n" +
            "\n" +
            "\n" +
            "**Путь CHIARO • SCURO**: Когда камень повернут внутрь, " +
            "нефрит касается кожи и раскрывает свою энергию —вы, вдыхаете, набираетесь сил. " +
            "Поворачивая камень к миру, вы выдыхаете, отдаете энергию, достигаете целей и двигаетесь вперед.\n" +
            "\n" +
            "\n" +
            "На обороте есть надпись на латыни «tertium non datur» — «третьего не дано». " +
            "Есть два варианта: вдох и выдох — третьего не дано.\n" +
            "\n" +
            "\n" +
            "**Артефакт**: Кольца-перевертыши появились в Древнем Египте. " +
            "Они были популярны среди знати и служили также функциональным предметом — печатью.",
        cartImage: cartImage,
    }
    const [product] = useState(initialProduct);
    const [itemsArticlesInCart, setItemsArticlesInCart] = useState<string[]>([])
    const [selectedSize, setSelectedSize] = useState<string>(product.possibleSizes[1]);

    return (
    <Router>
        <Navigation/>
        <Routes>
            <Route
                path="/"
                element={
                    <ProductCard
                        product={product}
                        selectedSize={selectedSize}
                        setSelectedSize={setSelectedSize}
                        setItemsArticlesInCart={setItemsArticlesInCart}
                        itemsArticlesInCart = {itemsArticlesInCart}
                    />
            } />
            <Route
                path="/cart"
                element={
                    <CartForm
                        product={product}
                        selectedSize={selectedSize}
                    />
                }/>
        </Routes>
    </Router>
  )
}

export default App
