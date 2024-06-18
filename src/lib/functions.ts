import moment from 'moment'


// HELPERS

export const strToNum = (string) => parseFloat(string.replace(/[^0-9$.,]/g, ''))
export const cap = (string) => string.charAt(0).toUpperCase() + string.slice(1)

//------------------------------------

//DS ARRAY
export const constructDsArray = (dsArray) => {
  const arr =  dsArray.map(str => str.split(' ').filter(Boolean)).slice(1)
  return arr.map(([fileSystem, size, used, avail, use, mountedOn]) => ({ fileSystem, size, used, avail, use, mountedOn }))
    .filter(drive => drive.fileSystem.includes('/dev') && strToNum(drive.use) >= 0)
    .sort((a, b) => strToNum(b.use) - strToNum(a.use)) 
}

// MEMORY
export const getMemoryValues = (memory) => {
  const values = memory.data[1].replace(/ +(?= )/g, '').replace('Mem: ', '').split(' ').splice(0, 2) 
  return `${values[1]}/${values[0]} GB`
} 

//BACKUPS

export const isolateInstanceBackups = (backupsArray, instance) => {
  const first = backupsArray.indexOf(instance.toUpperCase())
  if (first > -1) {

    const last = backupsArray.slice(first).findIndex((value, i) => i !== 0 && !value.includes('postgres postgres') && !value.includes('root') )
    return backupsArray.slice(first + 1, last).slice(1)
  } else return null
}

export const getLastBackup = (backupValues) => {
  if (backupValues) {
    const arr = backupValues.map(backup => {
      const arr = backup.replace(/\s+/g, ' ').split(' ')
      const date = moment(arr.slice(8)[0].replace(/\D/g, '').slice(0, 8), 'YYYYMMDD')
      const size = arr.slice(4)[0]
      return { size, date }
    })

    const lastBackupDate = moment.max(arr.filter(val => val.date._isValid).map(val => val.date))
    return arr[arr.findIndex(val => val.date === lastBackupDate)]
  }
}

// AUDIT LOGS 
export const getLastLogin = (logs) => {
  return logs.filter(log => log.description === 'Successful Login Complete').sort((a,b) => b.created - a.created)[0]
  
}
