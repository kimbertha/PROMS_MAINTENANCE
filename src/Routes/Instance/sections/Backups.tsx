import React from 'react'
import { constructObject } from '../../../lib/functions/helpers'
import { isolateBackups } from '../../../lib/functions/functions'
import Terminal from '../../../components/terminal/Terminal'


const Backups = ({ backups, instance }) => {
  const titles = ['title', 'unit', 'db1', 'db2', 'size', 'month', 'day', 'time', 'name']

  const isolate = backups && isolateBackups(backups, instance.backupId ? instance.backupId : instance.id)

  if (!isolate) return null
  const objs = isolate.map(obj => constructObject(obj, titles ))
  return (
    <Terminal arr={objs} titles={titles} header='Backups' />
    
  )
}
export default Backups