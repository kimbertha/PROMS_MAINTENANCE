import moment from 'moment'
import { dates } from '../vars'
import { strToNum, constructObject } from './helpers'
//------------------------------------

//DS ARRAY
export const constructDsArray = (dsArray) => {
  return dsArray.map(obj => constructObject(obj, ['fileSystem', 'size', 'used', 'avail', 'use', 'mountedOn']))
    .filter(drive => drive.fileSystem.includes('/dev') && strToNum(drive.use) >= 0)
    .sort((a, b) => strToNum(b.use) - strToNum(a.use))
  
  
}

// MEMORY
export const getMemoryValues = (memory) => {
  const memoryValues = constructObject(memory[1], ['total', 'used'], [1, 2])
  return `${memoryValues?.used}/${memoryValues?.total} GB`
}

// AUDIT LOGS 
export const getLastLogin = (logs) => {
  return logs.filter(log => log.description === 'Successful Login Complete').sort((a, b) => b.created - a.created)[0]
}

// CRON
export const getCronFreq = (cronArr, instance, date) => {
  const path =  cronArr.filter(val => val.includes('sudo -u postgres pg_dump -U postgres') && val.includes(instance))[0]
  if (path) {
    const freq = path.split(' ')[0].replace('@', '')
    if (freq === 'daily') {
      return { path: freq, check: date.startOf('day').isSame(dates.daily.startOf('day')) || date.startOf('day').isSame(moment().startOf('day')) }
    } else {
      return { path: freq, check: date.isBetween(dates[freq], moment()) }
    }
  } 
}

//BACKUPS

export const isolateBackups = (backupValues, instance) => {
  const first = backupValues.indexOf(instance.toUpperCase())
  if (first > -1) {
    const last = backupValues.slice(first).findIndex((value, i) => i !== 0 && !value.includes('postgres') && !value.includes('root'))
    return backupValues.slice(first + 1, last).slice(1)
  }
}

export const getLastBackup = (backupValues, instance) => {
  const isolated = isolateBackups(backupValues, instance)
  if (isolated) {
    const constructObj = isolated.map(obj => constructObject(obj, ['size', 'name'], [4, 8]))
    const withDate = constructObj.map(val => ({ ...val, date: moment(val.name.replace(/\D/g, '').slice(0, 8)) }))
      .filter(val => val.date._isValid)
      .sort((a, b) => (b.date).diff(a.date))
    return withDate[0]
  } 
}



