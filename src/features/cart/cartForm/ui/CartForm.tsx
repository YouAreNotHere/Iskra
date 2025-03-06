import "./CartForm.scss"
import CartButton from "../../../../assets/CartButton.tsx";
import {useState, useEffect} from "react";
import CartItem from "../../cartItem/CartItem.tsx";
import {getCartItems} from "../../api/cart.request.tsx";
import fixTotalPrice from "../../../../shared/functions/FixTotalPrice.tsx";

const CartForm = () => {

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const price = cartItems.reduce((acc, item) => acc + fixTotalPrice(item.subtotal), 0);

    const deleteCartItemFromState = (id: string) => {
        const newCartItems = cartItems.filter(item => item?.id !== id);
        setCartItems(newCartItems);
    }

    const getCartContents = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await getCartItems();
            const data = await response.json();
            if (data.success) {
                setCartItems(data.data.cart);
            } else {
                setError(data.data.message);
            }
        } catch (err) {
            setError('Произошла ошибка при загрузке корзины');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCartContents();
    }, []);

    if (loading) return <p>Загрузка корзины...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    console.dir(cartItems);
    return(
        <section className="cart">
            <h1 className="cart__title">
                корзина
            </h1>
            <div className="cart__general-info-and-promo">
                <div className="cart__titles-row">
                    <p className="cart__number-of-pruducts-item">Изделие</p>
                    <p className="cart__number-of-pruducts-price">Цена</p>
                    <p className="cart__number-of-pruducts-number">Количество</p>
                    <p className="cart__number-of-pruducts-total">Сумма</p>
                    <CartButton/>
                </div>
                <div className="cart__products-info">
                    {cartItems.map((item) => (
                        <CartItem
                            key={item.id}
                            product={item}
                            handleDeleteItem={deleteCartItemFromState}/>
                    ))}
                </div>
                <div className="promocode">
                    <input placeholder="Промокод" className="promocode__input"/>
                    <button className="promocode__button">
                        Применить
                    </button>
                </div>
            </div>
            <div className="total-bill">
                <h1>Итого</h1>
                <div className="total-bill__price">
                    <p>Цена</p>
                    <p>{price}</p>
                </div>
            </div>
        </section>
    )
}

export default CartForm;