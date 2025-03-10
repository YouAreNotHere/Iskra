const formatNumber = (number) => {
    return number
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
        // .replace(/(\d[\d\s]*)\.\d+/, '$1')
        // .replace(/\s+/g, '');
}

export default formatNumber;