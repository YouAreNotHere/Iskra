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

export const postOrder = async (data) =>
    await fetch(ajaxUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        credentials: 'include',
        body: new URLSearchParams({
            action: 'post_order',
            first_name: data.name,
            last_name: data.surname,
            phone: data.phone,
            email: data.email,
            address: data.address,
            comments: data.comment,
            payment_method: data.paymentMethod,
            shipping_method: data.deliveryMethod,
        }).toString(),
    })