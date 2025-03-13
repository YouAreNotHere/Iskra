import conversionHTMLToString from "./ConversionHTMLToString.tsx";
import formatNumber from "./FormatNumber.tsx";
import ICartItem from "../../features/cart/types/ICartItem.tsx";
import IOrderProduct from "../../features/order/types/IOrderProduct.tsx";

const calcTotal = (products: ICartItem[] | IOrderProduct[], total: string) => {
    return formatNumber(products.reduce((acc, item) => acc + conversionHTMLToString(item.subtotal[total]), 0))
}

export default calcTotal;