

// HELPERS --------------

export const strToNum = (string) => parseFloat(string.replace(/[^0-9$.,]/g, ''))
export const cap = (string) => string.charAt(0).toUpperCase() + string.slice(1)


//--- MISC----------------------

export const constructObject = (arr, keys, indexes = null) => {
  const values = arr.replace(/\s+/g, ' ').split(' ')
  const removed = indexes ? values.filter((val,i) => indexes.includes(i)) : values
  return Object.fromEntries(removed.map((val, i) => [keys[i], val]))
}

