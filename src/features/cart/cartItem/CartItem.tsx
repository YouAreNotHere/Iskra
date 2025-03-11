import CartButton from "../../../assets/CartButton.tsx";
import "./CartItem.scss"
import {useState} from "react";
import conversionHTMLToString from "../../../shared/functions/ConversionHTMLToString.tsx"
import formatNumber from "../../../shared/functions/FormatNumber.tsx";
import {useRequest} from "../../../shared/hooks/useRequest.ts";

const CartItem = ({product, cartItems, setCartItems}) => {
    const [productState, setProductState] = useState(product);
    const {categories, name, size, price, cart_item_key: cartItemKey, quantity,subtotal, image, id} = productState;
    const {current: currentPrice} = price;
    const {current: currentSubtotal} = subtotal;
    const newPrice = formatNumber(currentPrice);
    const newName = name.replace(/\s*-\s*\d+(\.\d+)?$/, '');
    const newSize = size === "" ? "Универсальный" : size.replace(/-/g, ',');
    const newSubtotal: number|string = formatNumber(conversionHTMLToString(currentSubtotal));

    const {makeRequest: deleteCartItem} = useRequest({
        method: "POST", body:{action: 'remove_from_cart', cart_item_key: cartItemKey}});
    const {makeRequest: decreaseCartItem} = useRequest({
        method: "POST", body:{action: 'decrease_cart_item_quantity', cart_item_key: cartItemKey}});
    const {makeRequest: increaseCartItem} = useRequest({
        method: "POST", body:{action: 'increase_cart_item_quantity', cart_item_key: cartItemKey}});


    const handleRemoveFromCart = async () => {
        deleteCartItem();
        const newCartItems = cartItems.filter(item => item?.id !== id);
        setCartItems(newCartItems);
    };

    const handleDecreaseCartItem = async () => {
        if (productState.quantity < 2) {
            handleRemoveFromCart()
        }

        if (productState.quantity > 1) {
            const newCartItems = cartItems.map((item) => {
                if (item.cart_item_key === cartItemKey) {
                    return {
                        ...item, quantity: item.quantity - 1,
                        subtotal: {regular: Number(item.subtotal.regular) - Number(item.price.regular),
                            current: Number(item.subtotal.current) - Number(item.price.current)}
                    }
                }else{
                    return item
                }
            })
            setCartItems(newCartItems);

            setProductState({...product, quantity: product.quantity - 1})
            decreaseCartItem();
        }
    }

    const handleIncreaseCartItem = async () => {
        const newCartItems = cartItems.map((item) => {
            if (item.cart_item_key === cartItemKey) {
                return {
                    ...item, quantity: item.quantity + 1,
                    subtotal: {regular: Number(item.subtotal.regular) + Number(item.price.regular),
                        current: Number(item.subtotal.current) + Number(item.price.current)}
                }
            }else{
                return item
            }
        })
        setCartItems(newCartItems);
        setProductState({...product, quantity: product.quantity + 1})
        increaseCartItem()
    }

    return (
        <div className="cart-item">
            <img className="cart-item__img" src={image}/>
            <div className="cart__info-without-img">
                    <div className="cart-item__info">
                        <p>{categories}</p>
                        <p>{newName}</p>
                        <p>Размер: {newSize}</p>
                    </div>
                <p className="cart__price">
                    {newPrice} ₽
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
                <p className="cart__total">{newSubtotal} ₽</p>
                <button
                    onClick={handleRemoveFromCart}
                    className="cart__button--delete">
                    <CartButton/>
                </button>
            </div>
        </div>
    )
}

export default CartItem;