import React, { useState, useEffect } from 'react';
import ProductItem from "../../productItem/ui/ProductItem.tsx";
import {useRequest} from "../../../shared/hooks/useRequest.ts";
import IProductListItem from "../type/IProductListItem.tsx";
import "./ProductsList.scss"

const ProductsList: React.FC = () => {
    const [products, setProducts] = useState<IProductListItem[]>([]);
    const {data, makeRequest: getProducts, errorMessage: error, isLoading} = useRequest({method: "POST", body: {action: 'get_all_products'}});


    useEffect(() => {
        getProducts()
    }, []);

    useEffect(() => {
        if (data) {
            setProducts(data.data);
        }
    }, [data]);

    if (error) {
        return <div>Ошибка: {error}</div>;
    }
    if (isLoading) {
        return <div>...Загрузка</div>;
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