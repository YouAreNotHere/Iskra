// import Product from "../../shared/types/IProduct.ts";
import "./ProductItem.scss"
import Product from "@shared/types/IProduct.ts";
import {useNavigate} from "react-router-dom";
import productsList from "@/features/productList/ProductsList.tsx";

interface ProductItem {
    image: string;
    price: string;
    name: string;
    description: string;
    id: number;
}

interface Props {
    product: Product
}

const ProductItem = ({product}: Props) => {
    const navigate = useNavigate();

    const onClickHandler = () =>{
        navigate(`/product/${product.slug}`);
    }
    return (
        <div
            className= "product-item"
            onClick={onClickHandler}
        >
            <img
                src ={product.image}
                width={535}
                height={633}
            />
            <p className="product-item__text">{product.price}</p>
            <p className="product-item__text">{product.name}</p>
        </div>
    )
}

export default ProductItem;