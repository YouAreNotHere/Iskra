import {ajaxUrl} from "../../../../shared/url/url.tsx";

export const getCartItems = async () =>
    await fetch(ajaxUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        credentials: 'include',
        body: new URLSearchParams({
            action: 'get_cart_contents',
        }).toString(),
    })

export const deleteCartItem = async (cartItemKey: string) =>
     await fetch(ajaxUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        credentials: 'include',
        body: new URLSearchParams({
            action: 'remove_from_cart',
            cart_item_key: cartItemKey,
        }).toString(),
    });
