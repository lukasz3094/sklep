export function currency(value) {
    return new Intl.NumberFormat("pl-PL",
        { style: "currency", currency: "PLN" }).format(value)      
}