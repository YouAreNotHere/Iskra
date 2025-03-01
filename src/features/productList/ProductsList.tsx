import React, { useState, useEffect } from 'react';
// import SelectedProductCard from './SelectedProductCard.tsx';
import ProductItem from "../productItem/ProductItem.tsx";
import "./ProductsList.scss"

interface Product {
    id: number;
    tags: {
        item: string;
        collection: string;
        article: string;
    };
    title: string;
    price: string;
    material?: string;
    stone?: string;
    possibleSizes: string[];
    textDescription: string;
    cartImage: string;
}

interface ErrorResponse {
    message: string;
}

const ProductsList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);

    const ajaxUrl = `${import.meta.env.VITE_WORDPRESS_URL}${import.meta.env.VITE_API_ENDPOINT}`;

    if (!ajaxUrl) {
        throw new Error('AJAX object is not defined or ajax_url is missing');
    }

    useEffect(() => {
        if (!ajaxUrl) return
        const fetchProducts = async () => {
            try {
                const response = await fetch(ajaxUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        action: 'get_all_products',
                    }),
                });

                if (!response.ok) {
                    throw new Error('Ошибка сервера');
                }

                const result: { success: boolean; data: Product[] | ErrorResponse } = await response.json();

                if (result.success) {
                    setProducts(result.data as Product[]);
                } else {
                    const errorData = result.data as ErrorResponse;
                    setError(errorData.message || 'Неизвестная ошибка');
                }
            } catch (err: any) {
                setError(`Произошла ошибка при загрузке товаров: ${err.message}`);
            }
        };

        fetchProducts();
    }, [ajaxUrl]);

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    console.dir(products)
    
    return (
        <>
            {products.length > 0 ? (
                <ul className="products-list">
                    {products.map((product: Product) => (
                      <li key={product.id}>
                          <ProductItem product = {product}/>
                      </li>))}
                </ul>
            ) : (
                <div>Загрузка...</div>
            )}
        </>
    );
};

export default ProductsList;