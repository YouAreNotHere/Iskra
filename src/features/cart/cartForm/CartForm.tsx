import "./CartForm.scss"
import CartButton from "../../../assets/CartButton.tsx";
import {useState, useEffect} from "react";
import CartItem from "../cartItem/CartItem.tsx";
// import Product from "../../shared/types/IProduct.ts";
// import IItemInCart from "../../shared/types/IItemInCart.ts";

// interface CartPageProps {
//     product: Product;
//     selectedSize: string,
//     itemsInCart?: IItemInCart[] | [],
// }

const CartForm = () => {

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const ajaxUrl = `${import.meta.env.VITE_WORDPRESS_URL}${import.meta.env.VITE_API_ENDPOINT}`

    const fetchCartContents = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(ajaxUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded', // Важно использовать этот формат
                },
                credentials: 'include',
                body: new URLSearchParams({
                    action: 'get_cart_contents',
                }).toString(), // Простой POST-запрос без nonce
            });

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
        fetchCartContents();
    }, []);

    if (loading) return <p>Загрузка корзины...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    console.dir(cartItems);
    return(
        <section className="cart">
            <h1 className="cart__title">
                корзина
            </h1>
            <div className="cart__product-info">
                <div className="cart__number-of-pruducts">
                    <div className="cart__titles-row">
                        <p className="cart__number-of-pruducts-item">Изделие</p>
                        <p className="cart__number-of-pruducts-price">Цена</p>
                        <p className="cart__number-of-pruducts-number">Количество</p>
                        <p className="cart__number-of-pruducts-total">Сумма</p>
                        <CartButton/>
                    </div>
                    {cartItems.map((item) => (
                        <CartItem key={item.id} product={item} />
                    ))}
                </div>
                <div className="cart__full-bill">

                </div>
            </div>
        </section>
    )
}

export default CartForm;