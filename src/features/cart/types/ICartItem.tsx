interface ICartItem{
    attributes: {
        pa_size?: string,
    };
    cart_item_key: string;
    categories: string[];
    id: number;
    image: string,
    article: string;
    name: string;
    price: {
        regular: string,
        current: string;
        sale: string;
    };
    quantity: number;
    size: string;
    subtotal:{
        [key: string]: number;
        regular: number,
        current: number,
    }
}

export default ICartItem;