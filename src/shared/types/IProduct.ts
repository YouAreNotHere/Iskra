interface Product{
    tags: {
        item: string,
        collection: string,
        article: string,
    },
    title: string,
    price: string,
    material: string,
    stone: string,
    possibleSizes: string[],
    textDescription: string,
    cartImage: string,
}

export default Product;