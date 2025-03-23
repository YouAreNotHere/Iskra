import {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

import IProductDetails from "../types/IProductDetails.tsx";
import {useRequest} from "../../../shared/hooks/useRequest.ts";
import {increaseCartQuantity} from "../../../shared/actions";
import "./ProductDetailsModal.scss"

interface ModalProps{
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    selectedSize: string;
    product: IProductDetails;
}

const ProductDetailsModal = ({isOpen, setIsOpen, selectedSize, product}: ModalProps) => {
    const [productQuantity, setProductQuantity] = useState("1");
    const [confirmButton, setConfirmButton] = useState("addToCart");
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const onDecreaseClickHandler = () => {
        if (Number(productQuantity) < 1)  return
        setProductQuantity((Number(productQuantity) - 1).toString());
    }

    const onIncreaseClickHandler = () => {
        setProductQuantity((Number(productQuantity) + 1).toString());
    }

    const {makeRequest: addItemToCart, data} = useRequest(
        {method: "POST", body:
                {action:  'add_to_cart', product_id: product?.id?.toString(), quantity: productQuantity, size: selectedSize}});

    return (
        <div className={isOpen ? "product-modal" : "product-modal--hidden"}>
            <button
                className="product-modal__button--close"
                onClick={() => {
                    setIsOpen(!isOpen)
                    setConfirmButton("addToCart")
                }
                }>
                Х
            </button>
            <h1 className="product-modal__title">Выберите количество товара</h1>
            <div className="product-modal__buttons-wrapper">
                <button onClick={onDecreaseClickHandler}>
                    -
                </button>
                <input
                    type="text"
                    value={productQuantity}
                    onChange={(e) => setProductQuantity(e.target.value)}
                />
                <button onClick={onIncreaseClickHandler}>
                    +
                </button>
            </div>
            <button
                className={confirmButton === "addToCart"
                    ? "product-modal__button--confirm"
                    : "product-modal__button--hidden"}
                disabled={productQuantity == "0"}
                onClick={() => {
                    addItemToCart()
                    dispatch(increaseCartQuantity())
                    setConfirmButton("navigateToCart")
                }
                }>
                Добавить товар в корзину
            </button>
            <button
                className={confirmButton === "addToCart"
                    ? "product-modal__button--hidden"
                    : !data ? "product-modal__button--disabled"
                        : "product-modal__button--navigate"}
                disabled={!data}
                onClick={() => {
                    console.log(data)
                    setIsOpen(!isOpen)
                    setConfirmButton("addToCart")
                    navigate('/cart')
                }
                }>
                Перейти в корзину
            </button>
        </div>
    )
}

export default ProductDetailsModal;