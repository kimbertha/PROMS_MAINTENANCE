import React from 'react'
import { Heading } from '@chakra-ui/react'
import { constructObject } from '../../lib/functions/helpers'
import { dataObj } from '../../lib/api'
import { isolateBackups } from '../../lib/functions/functions'
import Terminal from '../../components/terminal/Terminal'


const Backups = ({ backups, instance, server }) => {
  const titles = ['title', 'unit', 'db1', 'db2', 'size', 'month', 'day', 'time', 'name']

  const instanceObj = dataObj.filter(obj => obj.id === server)[0].instances.filter(inst => inst.id === instance)[0]
  const backupId = instanceObj.api ? instanceObj.id : instanceObj.backupId
  const isolate = backups && isolateBackups(backups, backupId)

  if (!isolate) return null
  const objs = isolate.map(obj => constructObject(obj, titles ))
  return (
    <>
      <Terminal arr={objs} titles={titles} header='Backups' />
    </>
    
  )
}
export default Backups