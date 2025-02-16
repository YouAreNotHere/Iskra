import "./CartForm.scss"
import CartButton from "../../assets/CartButton.tsx";
import Product from "../../shared/types/IProduct.ts";
import IItemInCart from "../../shared/types/IItemInCart.ts";

interface CartPageProps {
    product: Product;
    selectedSize: string,
    itemsInCart?: IItemInCart[] | [],
}

const CartForm = ({product, selectedSize,}: CartPageProps) => {

    // const items = itemsInCart.map((item: IItemInCart) => ())

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
                    <div className = "cart__current-items">
                        <div className="cart__item-wrapper">
                            <img
                                width="117"
                                height="138"
                                src={product.cartImage}
                                alt="Ring"/>
                            <div className="cart__item-info">
                                <p>{product.tags.item}</p>
                                <p>{product.title}</p>
                                <p>{selectedSize}</p>
                            </div>
                        </div>
                        <p className="cart__price">
                            {product.price}
                        </p>
                        <div className="cart__item-number-wrapper">
                            <button className="cart__button-decrease">
                                -
                            </button>
                            <p className="cart__current-number-of-item">
                                {}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="cart__full-bill">

                </div>
            </div>
        </section>
    )
}

export default CartForm;