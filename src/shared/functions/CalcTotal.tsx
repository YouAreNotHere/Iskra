import conversionHTMLToString from "./ConversionHTMLToString.tsx";
import formatNumber from "./FormatNumber.tsx";

const calcTotal = (products,total) => {
    return formatNumber(products.reduce((acc, item) => acc + conversionHTMLToString(item.subtotal[total]), 0))
}

export default calcTotal;