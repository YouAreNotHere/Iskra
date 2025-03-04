import {deleteCartItem, decreaseCartItem} from "../cartForm/api/cart.request.tsx";
import CartButton from "../../../assets/CartButton.tsx";
import "./CartItem.scss"

const CartItem = ({product}) => {
    const {categories, name, size, price, cart_item_key: cartItemKey, quantity,subtotal} = product;
    const regExp = /\s*-\s*\d+$/;
    const newName = name.replace(regExp, '');
    const newSize = size === "" ? "Универсальный" : size;
    const newSubtotal = subtotal
        .replace(/<[^>]+>/g, '')
        .replace(/&#\d+;/g, '')
        .replace(/,/g, '')
        .match(/\d+\.\d+|\d+/)[0];

    const handleRemoveFromCart = async () => {
        console.log(cartItemKey)
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

    return (
        <div className="cart__current-items">
            <div className="cart__item-wrapper">
                <div className="cart__item-info">
                    <p>{categories}</p>
                    <p>{newName}</p>
                    <p>{newSize}</p>
                </div>
            </div>
            <p className="cart__price">
                {price}
            </p>
            <div className="cart__item-number-wrapper">
                <button
                    onClick={handleDecreaseCartItem}
                    className="cart__button-decrease">
                    -
                </button>
                <p className="cart__current-number-of-item">
                    {quantity}
                </p>
                <button
                    // onClick={handleRemoveFromCart}
                    className="cart__button-increase">
                    +
                </button>
            </div>
            {newSubtotal}
            <button
                onClick={handleRemoveFromCart}
                className="cart__number-of-pruducts__button--clean-cart">
                <CartButton/>
            </button>
        </div>
    )
}

export default CartItem;