import "./CartItem.scss"

import {useDispatch} from "react-redux"

import CartButton from "../../../assets/CartButton.tsx";
import conversionHTMLToString from "../../../shared/functions/ConversionHTMLToString.tsx"
import formatNumber from "../../../shared/functions/FormatNumber.tsx";
import {useRequest} from "../../../shared/hooks/useRequest.ts";
import Spinner from "../../../shared/effects/Spinner.tsx";
import {increaseProduct, decreaseProduct, deleteProduct, decreaseCartQuantity} from "../../../shared/actions";
import ICartItem from "../../cart/types/ICartItem.tsx";

interface Props{
    product: ICartItem;
}

const CartItem = ({product}: Props) => {
    const dispatch = useDispatch();
    const {categories, name, size, price, cart_item_key: cartItemKey,
        quantity,subtotal, image, id} = product;
    const {current: currentPrice} = price;
    const {current: currentSubtotal} = subtotal;
    const newPrice = formatNumber(currentPrice);
    const newName = name.replace(/\s*-\s*\d+(\.\d+)?$/, '');
    const newSize = size === "" ? "Универсальный" : size.replace(/-/g, ',');
    const newSubtotal: number|string = formatNumber(conversionHTMLToString(currentSubtotal));

    const {makeRequest: deleteCartItem, isLoading: isRemoveLoading} = useRequest({
        method: "POST", body:{action: 'remove_from_cart', cart_item_key: cartItemKey}});
    const {makeRequest: decreaseCartItem, isLoading: isDecreaseLoading} = useRequest({
        method: "POST", body:{action: 'decrease_cart_item_quantity', cart_item_key: cartItemKey}});
    const {makeRequest: increaseCartItem, isLoading: isIncreaseLoading} = useRequest({
        method: "POST", body:{action: 'increase_cart_item_quantity', cart_item_key: cartItemKey}});


    const handleRemoveFromCart = async () => {
        await deleteCartItem();
        dispatch(deleteProduct(id))
        dispatch(decreaseCartQuantity())
    };

    const handleDecreaseCartItem = async () => {
        if (quantity < 2) {
            handleRemoveFromCart()
            return
        }

        dispatch(decreaseProduct(cartItemKey))
        await decreaseCartItem();
    }

    const handleIncreaseCartItem = async () => {
        dispatch(increaseProduct(cartItemKey))
        await increaseCartItem()
    }

    return (
        <div className="cart-item">
            <img className="cart-item__img" src={image}/>
            <div className="cart__info-without-img">
                    <div className="cart-item__info">
                        <div className="cart-info__categories">
                            <p className="cart-info__categories--title">Товар: </p>
                            <p className="cart-info__categories--text">{categories}</p>
                        </div>
                        <p>{newName}</p>
                        <p>Размер: {newSize}</p>
                    </div>
                <div className="cart__price">
                    <p className="cart__price--title">Цена</p>
                    <p>
                        {newPrice} ₽
                    </p>
                </div>
                <div className="cart__quantity-control">
                    <p className="cart__current-number-of-item--text">
                        Количество
                    </p>
                    <div className="cart__quantity-control-wrapper">
                        <button
                            onClick={handleDecreaseCartItem}
                            className="cart__button-decrease">
                            -
                        </button>
                        <p className="cart__current-number-of-item">
                            {quantity}
                        </p>
                        <button
                            onClick={handleIncreaseCartItem}
                            className="cart__button-increase">
                            +
                        </button>
                    </div>
                </div>
                <p className="cart__total">{newSubtotal} ₽</p>
                <button
                    onClick={handleRemoveFromCart}
                    className="cart__button--delete">
                    <CartButton/>
                </button>
            </div>
            <Spinner isLoading={isIncreaseLoading || isDecreaseLoading || isRemoveLoading}/>
        </div>
    )
}

export default CartItem;