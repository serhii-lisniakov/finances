export const getPriceInUAH = (price: number, currencyPrice: number) => {
    return +(price * currencyPrice).toFixed();
}

export const getPriceInCurrency = (price: number, currencyPrice: number) => {
    return +(price / currencyPrice).toFixed();
}

export const getFormattedPrice = (price: number, currency = 'UAH') => {
    return new Intl.NumberFormat('en-US', {
        currency,
    }).format(price);
}
