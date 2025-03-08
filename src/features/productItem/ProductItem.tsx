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
    const {slug, image, price, name, regular_price: regularPrice} = product;
    const newRegularPrice = (regularPrice === price) ? null : regularPrice;

    const onClickHandler = () =>{
        navigate(`/product/${slug}`);
    }
    return (
        <div
            className= "product-item"
            onClick={onClickHandler}
        >
            <img
                src ={image}
                width={535}
                height={633}
            />
            <p className={newRegularPrice
                ? "product-item__text product-item__sale-price"
                : "product-item__text"}>{price}
            </p>
            {newRegularPrice ? <p className="product-item__text product-item__regular-price">{newRegularPrice}</p> : null}
            <p className="product-item__text">{name}</p>
        </div>
    )
}

export default ProductItem;