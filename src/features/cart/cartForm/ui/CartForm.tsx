import "./CartForm.scss"
import CartButton from "../../../../assets/CartButton.tsx";
import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import CartItem from "../../cartItem/CartItem.tsx";
import {getCartItems} from "../../api/cart.request.tsx";
import FormatTotal from "../../../../shared/functions/FormatTotal.tsx";

const CartForm = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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

    const regularTotal = FormatTotal(cartItems, "regular");
    const currentTotal = FormatTotal(cartItems, "current");
    let sale: number | string = regularTotal.replace(/ /g, '') - currentTotal.replace(/ /g, '');
    sale = sale.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');

    console.dir(cartItems)

    return(
        <section className="cart">
            <div className="cart__title-and-general">
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
            </div>
            <div className="total-bill">
                <h1>Итого</h1>
                <div className="total-bill__regular-price">
                    <p>Цена</p>
                    <p>{regularTotal} ₽</p>
                </div>
                <div className="total-bill__sale">
                    <p>Скидка</p>
                    <p>{sale} ₽</p>
                </div>
                <div className="total-bill__finish-price">
                    <p>Итоговая цена</p>
                    <p>{currentTotal} ₽</p>
                </div>
                <button
                    onClick={()=> navigate(`/order`)}
                    className="total-bill__button">
                    Сделать заказ
                </button>
            </div>
        </section>
    )
}

export default CartForm;