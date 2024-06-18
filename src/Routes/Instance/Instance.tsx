import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Heading } from '@chakra-ui/react'
import { dataURL, logFilesURL } from '../../lib/api'
import { cap } from '../../lib/functions/helpers'
import { TbMailExclamation } from 'react-icons/tb'

import TabsMenu from '../../components/page-menu/TabsMenu'
import Backups from './Backups'
import Cron from './Cron'
import AuditLogs from './AuditLogs'
import Summary from './Summary'

import './instance.scss'
import LogFiles from './LogFiles'
import { apiCaller } from '../../lib/hooks'
import { isolateBackups } from '../../lib/functions/functions'
import { dataObj } from '../../lib/api'

const Instance = () => {
  const { server: serverURL, instance: instanceURL } = useParams()
  const main = dataObj.filter(obj => obj.id === serverURL)[0].main

  const instance = apiCaller(dataURL(serverURL, instanceURL)).data
  const server = apiCaller(dataURL(serverURL, main)).data
  const logFiles = apiCaller(logFilesURL(serverURL, instanceURL))
  
  const tabElements = [
    {
      title: 'Summary',
      element: <Summary logFiles={logFiles} instance={instance} server={server} />
    },{
      title: 'Audit Logs',
      element: <AuditLogs auditLogs={server?.auditLogs}/>
    },{
      title: 'Backups',
      element: <Backups backups={server?.backupArray} server={serverURL} instance={instanceURL} />
    },{
      title: 'Cron',
      element: <Cron instance={instance}/>
    },
    {
      title: 'Log Files',
      element: <LogFiles logFiles={logFiles} />
    }]
  

  return (
    <Box className='container'>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Box>
          <Heading size='lg'>{cap(serverURL)} {cap(instanceURL)}</Heading>
          <small>PROMS maintenance panel</small>
        </Box>
        <TbMailExclamation size='1.5em' />
      </Box>

      <TabsMenu tabs={tabElements} my={10} />
    </Box>
  )
}
export default Instance