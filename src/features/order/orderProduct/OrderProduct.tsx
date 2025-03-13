import "./OrderProduct.scss"
import IOrderProduct from "../types/IOrderProduct.tsx";

interface Props{
    product:IOrderProduct;
}

const OrderProduct = ({product}: Props) => {
    const {categories, name, subtotal, attributes} = product;
    const newSize = attributes.pa_size ? attributes.pa_size.replace(/-/g, ',') : "Универсальный";
    const newPrice = subtotal.current.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
    const regExp = /\s*-\s*\d+(\.\d+)?$/;
    const newName = name.replace(regExp, '');

    return(
        <section className="order-product">
            <div className="order-product__info-wrapper">
                <p className="order-product__text">{categories}</p>
                <p className="order-product__text">{newName}</p>
                <p className="order-product__text">Размер: {newSize}</p>
            </div>
            <p className="order-product__price">{newPrice} ₽</p>
        </section>
    )
}

export default OrderProduct;