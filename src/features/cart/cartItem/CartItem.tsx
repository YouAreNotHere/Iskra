import {deleteCartItem, decreaseCartItem, increaseCartItem} from "../../../features/cart/api/cart.request.tsx";
import CartButton from "../../../assets/CartButton.tsx";
import "./CartItem.scss"
import {addToCartItem} from "../../../features/productDetails/api/product.request.tsx";
import {useState} from "react";

const CartItem = ({product}) => {
    const {categories, name, size, price, cart_item_key: cartItemKey, quantity,subtotal, image} = product;
    const regExp = /\s*-\s*\d+(\.\d+)?$/;
    const newName = name.replace(regExp, '');
    const newSize = size === "" ? "Универсальный" : size.replace(/-/g, ',');
    const newSubtotal = subtotal
        .replace(/<[^>]+>/g, '')
        .replace(/&#\d+;/g, '')
        .replace(/,/g, '')
        .match(/\d+\.\d+|\d+/)[0];

    const handleRemoveFromCart = async () => {
        try {
            const response = await deleteCartItem(cartItemKey)

            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }

            // const data = await response.json();
        } catch (error) {
            console.error('Произошла ошибка:', error.message);
        }
    };

    const handleDecreaseCartItem = async () => {
        try{
            const response = await decreaseCartItem(cartItemKey);

            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }

            // const data = await response.json();

        } catch(error) {
            console.error('Ошибка запроса:', error.message)
        }
    }

    const handleIncreaseCartItem = async () => {
        try{
            const response = await increaseCartItem(cartItemKey);

            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }


        } catch(error) {
            console.error('Ошибка запроса:', error.message)
        }
    }

    return (
        <div className="cart-item">
            <img className="cart-item__img" src={image}/>
            <div className="cart__info-without-img">
                {/*<div className="cart__item-wrapper">*/}
                    <div className="cart-item__info">
                        <p>{categories}</p>
                        <p>{newName}</p>
                        <p>Размер: {newSize}</p>
                    </div>
                {/*</div>*/}
                <p className="cart__price">
                    {price}
                </p>
                <div className="cart__quantity-control">
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
                <p className="cart__total">{newSubtotal}</p>
                <button
                    onClick={handleRemoveFromCart}
                    className="cart__number-of-pruducts__button--clean-cart">
                    <CartButton/>
                </button>
            </div>
        </div>
    )
}

export default CartItem;