interface IProductDetails{
    article: string;
    attributes: {
        material: string[],
        pa_size?: string[],
        size?: string[],
        stone?: string[],
    };
    brand: {
        link: string,
        name: string,
        slug: string,
    };
    categories: string[];
    description: string;
    gallery_images: string[];
    id: number;
    is_on_sale: boolean;
    name: string;
    price: string;
    regular_price?: string;
    tags?: [];
}

export default IProductDetails;