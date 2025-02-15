import Navigation from "../shared/navigation/Navigation.tsx";
import ProductCard from "../features/productCard/ProductCard.tsx";
import Product from "@shared/ICartProps.ts";
import { Dispatch, SetStateAction } from 'react';


interface Props{
    product: Product,
    selectedSize: string,
    setSelectedSize: Dispatch<SetStateAction<string>>,
    setItemsArticlesInCart: Dispatch<SetStateAction<string[]>>,
    itemsArticlesInCart: string[] | [],
}


const ProductPage = ({product, selectedSize, setSelectedSize, setItemsArticlesInCart, itemsArticlesInCart}:Props) => {
    return(
        <>
            <Navigation/>
            <ProductCard
                product={product}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                setItemsArticlesInCart={setItemsArticlesInCart}
                itemsArticlesInCart={itemsArticlesInCart}
            />
        </>

    )
}

export default ProductPage;