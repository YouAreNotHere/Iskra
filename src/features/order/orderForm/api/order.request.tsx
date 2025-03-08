import {ajaxUrl} from "../../../../shared/url/url.tsx";

export const getOrderProducts = async () =>
    await fetch(ajaxUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        credentials: 'include',
        body: new URLSearchParams({
            action: 'get_order_products',
        }).toString(),
    })