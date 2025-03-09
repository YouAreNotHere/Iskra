import fixTotalPrice from "./FixTotalPrice.tsx";
import formatNumber from "./FormatNumber.tsx";

const formatTotal = (products,total) => {
    return formatNumber(products.reduce((acc, item) => acc + fixTotalPrice(item.subtotal[total]), 0))
}

export default formatTotal;