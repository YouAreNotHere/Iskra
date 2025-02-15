import Navigation from "@shared/navigation/Navigation.tsx";
import CartForm from "@/features/cart/CartForm.tsx";
import Product from "@shared/ICartProps.ts";

interface CartPageProps {
    product: Product,
    selectedSize: string,
}

const CartPage = ({ product, selectedSize }: CartPageProps) => {
    return(
        <>
            <Navigation/>
            <CartForm
                product={product}
                selectedSize={selectedSize}
            />
        </>

    )
}

export default CartPage;