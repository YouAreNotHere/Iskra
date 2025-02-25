import React, { useState, useEffect } from 'react';

// Определение типов для товара
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

// Тип для ошибочного ответа
interface ErrorResponse {
    message: string;
}

const ProductsList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Проверяем наличие ajax_object
    const ajaxUrl = window.ajax_object?.ajax_url;
    console.log(`w ${window.ajax_object}`)

    if (!ajaxUrl) {
        throw new Error('AJAX object is not defined or ajax_url is missing');
    }else{
        console.log(`ajaxUrl: ${ajaxUrl}`);
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
                        action: 'get_all_products', // Действие должно совпадать с PHP-обработчиком
                    }),
                });

                if (!response.ok) {
                    throw new Error('Ошибка сервера');
                }

                console.dir(response)
                const result: { success: boolean; data: Product[] | ErrorResponse } = await response.json();

                if (result.success) {
                    // Если запрос успешен, устанавливаем массив товаров
                    setProducts(result.data as Product[]);
                } else {
                    // Если запрос не успешен, проверяем наличие свойства message
                    const errorData = result.data as ErrorResponse;
                    setError(errorData.message || 'Неизвестная ошибка');
                }
            } catch (err: any) {
                setError(`Произошла ошибка при загрузке товаров: ${err.message}`);
            }
        };

        fetchProducts();
    }, [ajaxUrl]); // Добавляем зависимость для перезапуска useEffect, если изменится ajaxUrl

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    // console.log(products)

    return (
        <div className="products-list">
            {products.length > 0 ? (
                products.map((product) => (
                    <div key={product.id} className="product-card">
                        {/*<img src={product.cartImage} alt={product.title} />*/}
                        <h2>{product.title}</h2>
                        <p>{product.textDescription}</p>
                        <span>{product.price}</span>
                    </div>
                ))
            ) : (
                <div>Загрузка...</div>
            )}
        </div>
    );
};

export default ProductsList;