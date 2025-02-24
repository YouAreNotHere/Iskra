import Ring from "../../assets/Ring.jpg";
import Rings from "../../assets/RingsOnWhiteHands.jpg";
import ChainInBlackHand from "../../assets/ChainInBlackHand.jpg";
import RingsOnBlackHands from "../../assets/RingsOnBlackHands.jpg";
import ChupaChups from "../../assets/ChupaChups.jpg";
import ShowAdditionalButton from "../../shared/buttons/ShowAdditionalButton.tsx";
import "./productCard.scss"
import Product from "../../shared/types/IProduct.ts";
import IItemInCart from "../../shared/types/IItemInCart.ts";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import ProductsList from "./ProductsList.tsx";

interface Props{
    product: Product,
    selectedSize: string,
    setSelectedSize: Dispatch<SetStateAction<string>>,
    setItemsInCart: Dispatch<SetStateAction<IItemInCart[]>>,
    itemsInCart: IItemInCart[] | [],
}

const ProductCard = ({product, selectedSize, setSelectedSize, setItemsInCart, itemsInCart}: Props) => {

    // const API_URL = 'http://iskra.infinityfreeapp.com/wp-json/wc/v3/products';
    const CONSUMER_KEY = 'ck_42c279db6dd683fb88c279c79ee900711dd2d692';
    const CONSUMER_SECRET = 'cs_42c186d89719f38273fb7b14ff6ae3d140787069';

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [__products, setProducts] = useState([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [__loading, setLoading] = useState(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true); // Устанавливаем состояние загрузки
            try {
                const response = await fetch('/api/wp-json/wc/v3/products', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic ' + btoa(`${CONSUMER_KEY}:${CONSUMER_SECRET}`),
                    },
                });

                if (!response.ok) {
                    console.log("!")
                    throw new Error('Network response was not ok ' + response.statusText);
                }

                const data = await response.json();
                await console.log(data);
                setProducts(data);
            } catch (err: unknown) {
                console.log("catch")
                console.log(err)
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred'); // Обрабатываем случай, если err не является ошибкой
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const onClickOnAddToCartHandler = () => {
        setItemsInCart([...itemsInCart, {article: product.tags.article, size: selectedSize}]);
    }

    const formatText = (text: string) => {
        const regex: RegExp = /(\*\*(.*?)\*\*|[^*]+)/g;
        const formattedText = text.replace(/\n/g, '<br/>');
        const result = [];
        let match;

        while ((match = regex.exec(formattedText)) !== null) {
            if (match[2]) {
                result.push(`<strong>${match[2]}</strong>`);
            } else {
                result.push(`${match[0].trim()}`);
            }
        }

        return result.join("");
    };

    return(
        <section className="product-card">
            <div className="product-card__images-wrapper">
                <div className="product-card__image--new">
                    <img src={Ring} alt="photo of ring" className="product-card__image" />
                </div>
                <img src={Rings} className="product-card__image" alt="photo of rings"/>
                <img src={ChainInBlackHand} className="product-card__image" alt="photo of chain"/>
                <img src={RingsOnBlackHands} className="product-card__image" alt="photo of rings in black hands"/>
                <img src={ChupaChups} className="product-card__image" alt="photo of rings and chupa chups"/>
            </div>
            <div className="product-card__description">
                <div className="product-card__tags-wrapper">
                    <div className="product-card__item-and-collection">
                        <p>{product.tags.item}</p>
                        <p>{product.tags.collection}</p>
                    </div>
                    <p>{product.tags.article}</p>
                </div>
                <h1 className="product-card__title">{product.title}</h1>
                <p className="product-card__price">{product.price}</p>
                <div className="product-card__material">
                    <p>Материал</p>
                    <p>{product.material}</p>
                </div>

                <div className="product-card__stone">
                    <p>Камень</p>
                    <p>{product.stone}</p>
                </div>
                <div className="product-card__possible-sizes">
                    <p>Размер</p>
                    <ul>
                        {product.possibleSizes.map((size) => (
                            <li key={size}>
                                <button
                                    onClick={() => setSelectedSize(size)}
                                    className={selectedSize === size ?
                                        "product-card__possible-sizes-item product-card__possible-sizes-item--selected"
                                        : "product-card__possible-sizes-item"}
                                >
                                    {size}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="product-card__add-buttons-wrapper">
                    <button
                        className="product-card__button--add-to-cart"
                        onClick={onClickOnAddToCartHandler}
                    >
                        Добавить в корзину
                    </button>
                    <button className="product-card__button--add-to-favorites">
                        <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M3 13.0714L10.9219 21.4196L10.945 21.4428C11.5235 22.0225 12.4658
                                22.012 13.0312 21.4196L21 13.0714L22.125 11.8929C23.2969 10.6652
                                24 8.94643 24 7.17857C24 3.49554 21.1406 0.5 17.625 0.5C15.9375 0.5
                                14.2969 1.23661 13.125 2.46429L13.0312 2.5625L12 3.64286L10.9219 2.5625L10.8281
                                2.46429C9.65625 1.23661 8.01562 0.5 6.32812 0.5C2.8125 0.5 0 3.49554 0
                                7.17857C0 8.94643 0.65625 10.6652 1.82812 11.8929L3 13.0714Z"
                                fill="#8E8E8E"/>
                        </svg>
                    </button>
                </div>
                    <p
                        className="product-card__text-description"
                        dangerouslySetInnerHTML={{__html: formatText(product.textDescription)}}/>
                <ShowAdditionalButton value={"в комплекте"}/>
                <ShowAdditionalButton value={"обмен и возврат"}/>
                <ShowAdditionalButton value={"гарантия"}/>
                <ShowAdditionalButton value={"доставка"}/>
            </div>
            <ProductsList/>
        </section>
)
}

export default ProductCard;