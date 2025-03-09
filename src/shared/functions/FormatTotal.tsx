import fixTotalPrice from "./FixTotalPrice.tsx";

const formatTotal = (products,total) => {
    return products
        .reduce((acc, item) => {
            return acc + fixTotalPrice(item.subtotal[total])
        }, 0)
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
}

export default formatTotal;