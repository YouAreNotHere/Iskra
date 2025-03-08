import {deleteCartItem, decreaseCartItem, increaseCartItem} from "../../../features/cart/api/cart.request.tsx";
import CartButton from "../../../assets/CartButton.tsx";
import "./CartItem.scss"
import {useState} from "react";
import fixTotalPrice from "../../../shared/functions/FixTotalPrice.tsx"

const CartItem = ({product, handleDeleteItem}) => {
    const [productState, setProductState] = useState(product);
    const {categories, name, size, price, cart_item_key: cartItemKey, quantity,subtotal, image, id} = productState;
    const {regular: regularPrice, current: currentPrice} = price;
    const {regular: regularSubtotal, current: currentSubtotal} = subtotal;
    const regExp = /\s*-\s*\d+(\.\d+)?$/;
    const newPrice = currentPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
    const newName = name.replace(regExp, '');
    const newSize = size === "" ? "Универсальный" : size.replace(/-/g, ',');
    let newSubtotal: number|string = fixTotalPrice(currentSubtotal);
    newSubtotal = newSubtotal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');

    const handleRemoveFromCart = async () => {
        try {
            handleDeleteItem(id)

            const response = await deleteCartItem(cartItemKey)

            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }

        } catch (error) {
            console.error('Произошла ошибка:', error.message);
        }
    };

    const handleDecreaseCartItem = async () => {
        try{

            if (productState.quantity < 2) {
                handleDeleteItem(id)
                console.log("Delete")
            }
            if (productState.quantity > 1) {
                const newProduct = {...productState, quantity: productState.quantity - 1};
                setProductState(newProduct);
            }


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

            const newProduct = {...productState, quantity: productState.quantity + 1};
            setProductState(newProduct);

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