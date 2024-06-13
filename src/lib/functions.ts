export const strToNum = (string) => parseFloat(string.replace(/[^0-9$.,]/g, ''))
export const cap = (string) => string.charAt(0).toUpperCase() + string.slice(1)

export const constructDsArray = (dsArray) => {
  const arr =  dsArray.map(str => str.split(' ').filter(Boolean)).slice(1)
  return  arr.map(([fileSystem, size, used, avail, use, mountedOn]) => ({ fileSystem, size, used, avail, use, mountedOn }))
}