const CartItem = ({product}) => {
    return (
        <div className="cart__current-items">
            <div className="cart__item-wrapper">
                <div className="cart__item-info">
                    <p>{product.categories}</p>
                    <p>{product.name}</p>
                    <p>{product.size}</p>
                </div>
            </div>
            <p className="cart__price">
                {/*{product.price}*/}
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
    )
}

export default CartItem;