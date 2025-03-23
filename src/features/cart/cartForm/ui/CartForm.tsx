import "./CartForm.scss"

import CartItem from "../../cartItem/CartItem.tsx";
import calcTotal from "../../../../shared/functions/CalcTotal.tsx";
import FormatNumber from "../../../../shared/functions/FormatNumber.tsx";
import {useRequest} from "../../../../shared/hooks/useRequest.ts";
import {loadProducts, setDeliveryCost} from "../../../../shared/actions";
import {IRootState} from "../../../../shared/types/RootState.ts";
import ICartItem from "../../types/ICartItem.tsx";
import CartButton from "../../../../assets/CartButton.tsx";

import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

const CartForm = () => {
    const cartItems: ICartItem[] = useSelector((state: IRootState)=> state.cartProducts)
    const {data, makeRequest: getCartItems, isLoading: loading, errorMessage:error} = useRequest(
        {method: "POST", body: {action: 'get_cart_contents'}});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        getCartItems();
    }, []);

    useEffect(() => {
        if (!data) return
        dispatch(loadProducts(data.data.cart))
        if (!data.data.totals) return;
        dispatch(setDeliveryCost(data.data.totals.shipping_cost))
    }, [data]);

    if (loading) return <p>Загрузка корзины...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    const regularTotal = calcTotal(cartItems, "regular");
    const currentTotal =  calcTotal(cartItems, "current");
    const sale:  string = FormatNumber(Number(regularTotal.replace(/ /g, ''))
        - Number(currentTotal.replace(/ /g, '')));

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
                    <div className={cartItems[0] ? "cart__products-info" : "cart__products-info--hidden"}>
                        {cartItems.map((item) => (
                            <CartItem
                                key={item.id}
                                product={item}
                            />
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