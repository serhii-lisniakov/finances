export const getPriceInUAH = (price: number, currencyPrice: number) => {
    return +(price * currencyPrice).toFixed(2);
}

export const getFormattedPrice = (price: number, currency = 'UAH') => {
    return new Intl.NumberFormat('en-US', {
        currency,
    }).format(price);
}
