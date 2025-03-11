const conversionHTMLToString = (total: number) =>{
    const newTotal = total
        .toString()
        .replace(/<[^>]+>/g, '')
        .replace(/&#\d+;/g, '')
        .replace(/,/g, '')
        .replace(/\.\d+$/, '')
        .trim();

    return Number(newTotal);
}

export default conversionHTMLToString;