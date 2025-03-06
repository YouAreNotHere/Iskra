const fixTotalPrice = (total: number) =>{
    return total
        .toString()
        .replace(/<[^>]+>/g, '')
        .replace(/&#\d+;/g, '')
        .replace(/,/g, '')
        .replace(/\.\d+$/, '')
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
        .trim();
}

export default fixTotalPrice;