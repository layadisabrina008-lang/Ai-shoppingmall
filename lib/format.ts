export const money = (value: number, currency: string, locale: string) =>
new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value)

export const distance = (km: number, locale: string) =>
new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(km) + ' km'
