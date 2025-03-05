import {ajaxUrl} from "../../../shared/url/url.tsx";

export const addToCartItem = async (size: string, id: number) =>
    await fetch(ajaxUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        credentials: 'include',
        body: new URLSearchParams({
            action: 'add_to_cart',
            product_id: id.toString(), // Преобразуем ID в строку
            // quantity: quantity.toString(),
            quantity: "1",
            size: size.toString(),
        }).toString(),
    });