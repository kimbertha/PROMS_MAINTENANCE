

// HELPERS --------------

export const strToNum = (string) => parseFloat(string.replace(/[^0-9$.,]/g, ''))
export const cap = (string) => string.charAt(0).toUpperCase() + string.slice(1)


//--- MISC----------------------

export const constructObject = (arr, keys, indexes = null) => {
  console.log(arr)
  const obj = arr.map(val => val.replace(/\s+/g, ' ').split(' '))
  const removed =  indexes ? obj.map(val => val.filter((val, i) => indexes.includes(i))) : obj
  return removed.map(arr => Object.fromEntries(arr.map((val, i) => [keys[i], val])))
}

export const constructObjectSingle = (arr, keys, indexes = null) => {
  const values = arr.replace(/\s+/g, ' ').split(' ')
  const removed = indexes ? values.filter((val,i) => indexes.includes(i)) : values
  return Object.fromEntries(removed.map((val, i) => [keys[i], val]))
}