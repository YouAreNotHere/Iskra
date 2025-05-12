import React, { useState, useEffect } from 'react';
import ProductItem from "../../productItem/ui/ProductItem.tsx";
import {useRequest} from "../../../shared/hooks/useRequest.ts";
import IProductListItem from "../type/IProductListItem.tsx";
import "./ProductsList.scss"

const ProductsList: React.FC = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(3);
    const [products, setProducts]
        = useState<IProductListItem[]>([]);

    const {makeRequest: getProducts, errorMessage: error, isLoading}
        = useRequest({
        url:`http://localhost/my-wordpress-site/wp-json/iskra/v1/products?page=${page}&limit=${limit}`,
        method: "GET",
        onSuccess:(data)=> setProducts(data)});

    useEffect(() => {
        getProducts()
    }, [page, limit]);

    return (
        <>
            {error && <p>Ошибка: {error}</p>}
            {isLoading && <p>Загрузка...</p>}
            {products.length > 0 && (
                <ul className="products-list">
                    {products.map((product: IProductListItem) => (
                      <li key={product.id}>
                          <ProductItem product = {product}/>
                      </li>))}
                </ul>
            )}
            <button onClick={()=>setPage(page+1)}>Страница: {page}</button>
            <button onClick={()=>setLimit(limit+1)}>Товаров на странице: {limit}</button>
        </>
    );
};

export default ProductsList;