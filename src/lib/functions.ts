export const strToNum = (string) => parseFloat(string.replace(/[^0-9$.,]/g, ''))
export const cap = (string) => string.charAt(0).toUpperCase() + string.slice(1)
