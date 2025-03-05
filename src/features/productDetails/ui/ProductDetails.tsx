import ShowAdditionalButton from "../../../shared/buttons/ShowAdditionalButton.tsx";
import "./ProductDetails.scss"
import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {ajaxUrl} from "../../../shared/url/url.tsx";
import {addToCartItem} from "../api/product.request.tsx";

interface Product{
    description: string;
    gallery_images: [];
    id: number;
    name: string;
    price: number;
    categories: [];
    brand: [];
    article: string;
    attributes: [];
}


const ProductDetails = () => {

    const { slug } = useParams(); // Получаем слаг из URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);
    const [addToCartLoading, setAddToCartLoading] = useState(false);
    const [addToCartError, setAddToCartError] = useState(null);

    const fetchProductBySlug = async (slug: string) => {
        try {
            const response = await fetch(`${ajaxUrl}?action=get_product_by_slug&slug=${slug}`);
            if (!response.ok) throw new Error('Не удалось загрузить товар');
            const data = await response.json();
            console.dir(data)
            return data.data;
        } catch (err) {
            console.error(err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (slug) {
            fetchProductBySlug(slug).then((productData) => {
                if (productData) {
                    setProduct(productData);
                }
            });
        }
    }, [slug]);


    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Произошла ошибка при загрузке товара</div>;

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
    const {description, gallery_images: galleryImages, id, name, price, categories, brand, article, attributes} = product;
    const {stone, material} = attributes;
    let sizes: string;
    if (attributes.pa_size){
        sizes = attributes.pa_size;
    }else{
        sizes = attributes.size
    }

    if (!selectedSize) setSelectedSize(sizes[0]);
    const selectClassName = (size: number | string) => {
        if (selectedSize === "Универсальный") {
            return "product-card__possible-sizes-item product-card__possible-sizes-item--selected product-card__possible-sizes-item--universal";
        }
        if (selectedSize === size) {
            return "product-card__possible-sizes-item product-card__possible-sizes-item--selected";
        }
        if (selectedSize !== size) return "product-card__possible-sizes-item"
    }

    const handleAddToCart = async (size, id) => {
        setAddToCartLoading(true);
        setAddToCartError(null);

        try {
            const response = await addToCartItem(size, id)

            const data = await response.json();

            if (data.success) {
                alert(data.data.message); // Успешное сообщение
            } else {
                setError(data.data.message); // Ошибка
            }
        } catch (err) {
            setAddToCartError('Произошла ошибка при добавлении в корзину');
        } finally {
            setAddToCartLoading(false);
        }
    };

    console.dir(product)

    return(
        <section className="product-card">
            <div className="product-card__images-wrapper">
                    {galleryImages.map((image: string, index: number) => (
                        <img key={index} src={image} className="product-card__image"/>
                    ))}
            </div>
            <div className="product-card__description">
                <div className="product-card__tags-wrapper">
                    <div className="product-card__item-and-collection">
                        <p>{categories[0]}</p>
                        <p>{brand.name}</p>
                    </div>
                    <p>{article}</p>
                </div>
                <h1 className="product-card__title">{name}</h1>
                <p className="product-card__price">{price}</p>
                <div className="product-card__material">
                    <p>Материал</p>
                    <p>{attributes.material}</p>
                </div>

                <div className="product-card__stone">
                    <p>Камень</p>
                    <p>{attributes.stone}</p>
                </div>
                <div className="product-card__possible-sizes">
                    <p>Размер</p>
                    <ul>
                        {sizes.map((sizeItem: string | number) => (
                            <li key={sizeItem}>
                                <button
                                    onClick={() => setSelectedSize(sizeItem)}
                                    className={selectClassName(sizeItem)}
                                >
                                    {sizeItem}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="product-card__add-buttons-wrapper">
                    <button
                        className="product-card__button--add-to-cart"
                        onClick={() => handleAddToCart(selectedSize)}
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
                        dangerouslySetInnerHTML={{__html: formatText(description)}}/>
                <ShowAdditionalButton value={"в комплекте"}/>
                <ShowAdditionalButton value={"обмен и возврат"}/>
                <ShowAdditionalButton value={"гарантия"}/>
                <ShowAdditionalButton value={"доставка"}/>
            </div>
        </section>
)
}

export default ProductDetails;