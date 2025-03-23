import ICartItem from "../../features/cart/types/ICartItem"

const cartProducts = (
  state: ICartItem[] = [],
  action: { [key: string]: string | number },
) => {
  switch (action.type) {
    case 'LOAD_PRODUCTS':
      return action.products;
    case 'INCREASE_PRODUCT':
      return state.map((item) => {
        if (item.cart_item_key === action.cartItemKey) {
          return {
            ...item, quantity: item.quantity + 1,
            subtotal: {regular: item.subtotal.regular + Number(item.price.regular),
              current: Number(item.subtotal.current) + Number(item.price.current)}
          }
        }else{
          return item
        }
      });
    case 'DECREASE_PRODUCT':
      return state.map((item) => {
        if (item.cart_item_key === action.cartItemKey) {
          return {
            ...item, quantity: item.quantity - 1,
            subtotal: {regular: item.subtotal.regular - Number(item.price.regular),
              current: Number(item.subtotal.current) - Number(item.price.current)}
          }
        }else{
          return item
        }
      });
    case 'DELETE_PRODUCT':
      return state.filter((item: ICartItem) => item.id !== action.id);
    case 'ADD_PRODUCT':
      return [...state, {id: action.id, quantity: action.quantity}]
    default:
      return state;
  }
};
export default cartProducts;
