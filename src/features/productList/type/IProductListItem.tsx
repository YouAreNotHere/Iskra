interface IProductListItem{
    id: number;
    image: string;
    is_on_sale: boolean;
    name: string;
    price: string,
    regular_price: string;
    slug: string;
}

export default IProductListItem;