import './OrderForm.scss';
// import {getCartItems} from "../../cart/api/cart.request.tsx";
import {getOrderProducts} from "../api/order.request.tsx";
import {useEffect, useState} from "react";
import OrderProduct from "../../orderProduct/OrderProduct.tsx";

const  OrderForm = () => {
    const [orderProducts, setOrderProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getProducts = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await getOrderProducts();
            const data = await response.json();
            if (data.success) {
                setOrderProducts(data.data.cart);
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
        getProducts()
    }, []);


    console.dir(orderProducts);

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
                            <input id="name" className="contact-info__name" type="text" placeholder=" "/>
                            <label htmlFor="name" className="contact-info__label">
                                <span className="contact-info__placeholder-text">Имя</span>
                                <span className="contact-info__asterisk">*</span>
                            </label>
                        </div>
                        <div className="contact-info__input-wrapper contact-info__input-wrapper--surname">
                            <input id="surname" className="contact-info__surname" type="text" placeholder=" "/>
                            <label htmlFor="surname" className="contact-info__label--surname">
                                <span className="contact-info__placeholder-text">Фамилия</span>
                                <span className="contact-info__asterisk">*</span>
                            </label>
                        </div>
                    </div>
                    <div className="contact-info__input-wrapper">
                        <input id="phone" className="contact-info__phone" type="text" placeholder=" "/>
                        <label htmlFor="phone" className="contact-info__label">
                            <span className="contact-info__placeholder-text">Телефон</span>
                            <span className="contact-info__asterisk">*</span>
                        </label>
                    </div>
                    <div className="contact-info__input-wrapper">
                        <input id="email" className="contact-info__email" type="text" placeholder=" "/>
                        <label htmlFor="email" className="contact-info__label">
                            <span className="contact-info__placeholder-text">Почта</span>
                            <span className="contact-info__asterisk">*</span>
                        </label>
                    </div>
                    <div className="contact-info__input-wrapper">
                        <input id="address" className="contact-info__address" type="text" placeholder=" "/>
                        <label htmlFor="address" className="contact-info__label">
                            <span className="contact-info__placeholder-text">Адрес</span>
                            <span className="contact-info__asterisk">*</span>
                        </label>
                    </div>
                    <div className="contact-info__input-wrapper">
                        <input id="comments" className="contact-info__comments" type="text" placeholder=" "/>
                        <label htmlFor="comments" className="contact-info__label--comments">
                            <span className="contact-info__placeholder-text contact-info__placeholder-text--comments">Комментарии</span>
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
                    <div>
                        <p className="order-info__total"></p>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default OrderForm;