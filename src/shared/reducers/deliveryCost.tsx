const deliveryCost = (
    state: string = "0",
    action: { [key: string]: string | number },
) => {
    switch (action.type) {
        case 'SET_DELIVERY_COST':
            return action.deliveryCost;
        default:
            return state;
    }
};

export default deliveryCost;
