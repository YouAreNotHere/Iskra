const cartQuantity = (
    state: number = 0,
    action: { [key: string]: string | number },
) => {
    switch (action.type) {
        case 'INCREASE_CART_QUANTITY':
            return state + 1;
        case 'DECREASE_CART_QUANTITY':
            return state - 1;
        case 'SET_CART_QUANTITY':
            return action.cartQuantity;
        default:
            return state;
    }
};

export default cartQuantity;
