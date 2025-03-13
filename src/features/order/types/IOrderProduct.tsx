interface IOrderProduct{
    attributes: {
        pa_size?: string,
    };
    categories: string[];
    id: number;
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

export default IOrderProduct;