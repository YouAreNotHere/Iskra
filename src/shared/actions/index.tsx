import ICartItem from "../../features/cart/types/ICartItem"

export const loadProducts = (products: ICartItem[]) => ({
  type: 'LOAD_PRODUCTS',
  products,
});

export const increaseProduct = (cartItemKey: string) => ({
  type: 'INCREASE_PRODUCT',
  cartItemKey,
});

export const decreaseProduct = (cartItemKey: string) => ({
  type: 'DECREASE_PRODUCT',
  cartItemKey,
});

export const deleteProduct = (id: number) => ({
  type: 'DELETE_PRODUCT',
  id,
});

export const increaseCartQuantity = () => ({
  type: 'INCREASE_CART_QUANTITY',
});

export const decreaseCartQuantity = () => ({
  type: 'DECREASE_CART_QUANTITY',
});

export const setCartQuantity = (cartQuantity: number) => ({
  type: 'SET_CART_QUANTITY',
  cartQuantity,
});

export const setDeliveryCost = (deliveryCost: string) => ({
  type: 'SET_DELIVERY_COST',
  deliveryCost,
})
