import './OrderForm.scss';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import OrderProduct from "../../orderProduct/OrderProduct.tsx";
import formatTotal from "../../../../shared/functions/FormatTotal.tsx";
import formatNumber from "../../../../shared/functions/FormatNumber.tsx";
import {useRequest} from "../../../../shared/hooks/useRequest.ts";

const  OrderForm = () => {
    const [deliveryMethod, setDeliveryMethod] = useState();
    const [paymentMethod, setPaymentMethod] = useState();
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [address, setAddress] = useState();
    const [comment, setComment] = useState();
    const navigate = useNavigate();
    const isButtonDisabled = deliveryMethod === "local_pickup"
        ? !name || !surname || !phone || !email
        : !name || !surname || !phone || !email || !address;
    const body = {action: 'post_order', first_name: name, last_name: surname,
        phone, email, address, comments: comment, payment_method: paymentMethod, shipping_method: deliveryMethod};
    const {makeRequest: postOrder} = useRequest({method: "POST", body});
    const {data, makeRequest: getOrderProducts} = useRequest({method: "POST", body : {action: 'get_order_products'}});


    useEffect(() => {
        getOrderProducts()
    }, []);

    if (!data) return <p> Загрузка...</p>

    const orderProducts = data.data.cart;
    const regularTotal = formatTotal(orderProducts, "regular");
    const currentTotal = formatTotal(orderProducts, "current");
    let deliveryCost = (data.data.totals.shipping_cost
        .replace(/(\d[\d\s]*)\.\d+/, '$1')
        .replace(/\s+/g, ''))
    let finishTotal = deliveryMethod === "flat_rate"
        ? Number(currentTotal.replace(/ /g, "")) + Number(deliveryCost) : currentTotal;
    finishTotal = formatNumber(finishTotal);
    deliveryCost = formatNumber(deliveryCost);

    return(
        <section className="order-form">
            <h1 className="order-form__title">
                Оформление заказа
            </h1>
            <div className="order-form__contact-and-order">
                <div className="contact-info">
                    <h2 className="contact-info__title">
                        Контактные данные
                    </h2>
                    <div className="contact-info__user-names">
                        <div className="contact-info__input-wrapper contact-info__input-wrapper--name">
                            <input
                                id="name"
                                className="contact-info__name"
                                type="text"
                                placeholder=" "
                                required={true}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <label htmlFor="name" className="contact-info__label">
                                <span className="contact-info__placeholder-text">Имя</span>
                                <span className="contact-info__asterisk">*</span>
                            </label>
                        </div>
                        <div className="contact-info__input-wrapper contact-info__input-wrapper--surname">
                            <input
                                id="surname"
                                className="contact-info__surname"
                                type="text"
                                placeholder=" "
                                required={true}
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                            />
                            <label htmlFor="surname" className="contact-info__label--surname">
                                <span className="contact-info__placeholder-text">Фамилия</span>
                                <span className="contact-info__asterisk">*</span>
                            </label>
                        </div>
                    </div>
                    <div className="contact-info__input-wrapper">
                        <input
                            id="phone"
                            className="contact-info__phone"
                            type="tel"
                            placeholder=" "
                            required={true}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <label htmlFor="phone" className="contact-info__label">
                            <span className="contact-info__placeholder-text">Телефон</span>
                            <span className="contact-info__asterisk">*</span>
                        </label>
                    </div>
                    <div className="contact-info__input-wrapper">
                        <input
                            id="email"
                            className="contact-info__email"
                            type="email"
                            placeholder=" "
                            required={true}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="email" className="contact-info__label">
                            <span className="contact-info__placeholder-text">Почта</span>
                            <span className="contact-info__asterisk">*</span>
                        </label>
                    </div>
                    <div className={deliveryMethod === "flat_rate"
                        ? "contact-info__input-wrapper"
                        : "contact-info__input-wrapper--hidden"
                    }>
                        <input
                            id="address"
                            className="contact-info__address"
                            type="text"
                            placeholder=" "
                            required={true}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <label htmlFor="address" className="contact-info__label">
                            <span className="contact-info__placeholder-text">Адрес</span>
                            <span className="contact-info__asterisk">*</span>
                        </label>
                    </div>
                    <div className="contact-info__input-wrapper">
                        <input
                            id="comments"
                            className="contact-info__comments"
                            type="text"
                            placeholder=" "
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <label htmlFor="comments" className="contact-info__label--comments">
                            <span
                                className="contact-info__placeholder-text contact-info__placeholder-text--comments">
                                Комментарии
                            </span>
                            <span className="contact-info__asterisk contact-info__asterisk--comments">*</span>
                        </label>
                    </div>
                </div>
                <div className="order-info">
                    <h2 className="order-info__title">
                        Ваш заказ
                    </h2>
                    <ul className="order-info__products">
                        {orderProducts.map(product => (
                            <li key={product.id}>
                                <OrderProduct product={product}/>
                            </li>
                        ))}
                    </ul>
                    <div className="order-info__total-wrapper">
                        <p className="order-info__total-title">Цена</p>
                        <p className="order-info__total">{regularTotal} ₽</p>
                    </div>
                    <div className="order-info__total-with-sale-wrapper">
                        <p className="order-info__total-title-with-sale">Цена со скидкой</p>
                        <p className="order-info__total-with-sale">{currentTotal} ₽</p>
                    </div>
                    <div className={deliveryMethod === "flat_rate"
                        ? "order-info__delivery-price-wrapper"
                        : "order-info__wrapper--hidden"}>
                        <p className="order-info__delivery-price-title">Стоимость доставки</p>
                        <p className="order-info__delivery-price-text">{deliveryCost} ₽</p>
                    </div>
                    <div className={deliveryMethod === "flat_rate"
                        ? "order-info__finish-total-wrapper"
                        : "order-info__wrapper--hidden"}>
                        <p className="order-info__finish-total-title">Итоговая стоимость</p>
                        <p className="order-info__finish-total-text">{finishTotal} ₽</p>
                    </div>
                    <form method={"post"} className="delivery-method">
                        <h2 className="delivery-method__title">Способ доставки</h2>
                        <div className="delivery-method__text-and-input">
                            <input
                                type="radio"
                                className="delivery-method__radio"
                                id="deliveryMethodRadio"
                                name="deliveryMethod"
                                value={deliveryMethod}
                                onChange={() => setDeliveryMethod("local_pickup")}
                            />
                            <p className="payment-method__text">Самовывоз</p>
                        </div>
                        <div className="delivery-method__text-and-input">
                            <input
                                type="radio"
                                className="delivery-method__radio"
                                id="deliveryMethodRadio"
                                name="deliveryMethod"
                                value={deliveryMethod}
                                onChange={() => setDeliveryMethod("flat_rate")}
                            />
                            <p className="delivery-method__text">Курьером</p>
                        </div>
                    </form>
                    <form method={"post"} className="payment-method">
                        <h2 className="payment-method__title">Способ оплаты</h2>
                        <div className="payment-method__text-and-input">
                            <input
                                type="radio"
                                className="payment-method__radio"
                                id="paymentMethodRadio"
                                name="paymentMethod"
                                value="online-cart"
                                onChange={() => setPaymentMethod("bacs")}
                            />
                            <p className="payment-method__text">Картой онлайн</p>
                        </div>
                        <div className={deliveryMethod === "local_pickup"
                            ? "payment-method__text-and-input"
                            : "payment-method__text-and-input--hidden"}>
                            <input
                                type="radio"
                                className="payment-method__radio"
                                id="paymentMethodRadio"
                                name="paymentMethod"
                                value="offline-cart"
                                onChange={() => setPaymentMethod("cod")}
                            />
                            <p className="payment-method__text">Картой при получении</p>
                        </div>
                        <div className={deliveryMethod === "local_pickup"
                            ? "payment-method__text-and-input"
                            : "payment-method__text-and-input--hidden"}>
                            <input
                                type="radio"
                                className="payment-method__radio"
                                id="paymentMethodRadio"
                                name="paymentMethod"
                                value="offline-cash"
                                onChange={() => setPaymentMethod("cod")}
                            />
                            <p className="payment-method__text">Наличными</p>
                        </div>
                    </form>
                    <button
                        className="order-info__button"
                        disabled={isButtonDisabled}
                        onClick={() => {
                            postOrder()
                            navigate('/')
                        }
                    }
                    >
                        Оформить заказ
                    </button>
                </div>
            </div>
        </section>
    )
}

export default OrderForm;