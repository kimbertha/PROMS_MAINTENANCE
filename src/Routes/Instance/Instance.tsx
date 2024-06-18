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


const Instance = () => {
  const { server, instance: instanceURL } = useParams()

  const instance = apiCaller(dataURL(server, instanceURL)).data
  const logFiles = apiCaller(logFilesURL(server, instance))

  

  const tabElements = [
    {
      title: 'Summary',
      element: <Summary logFiles={logFiles} instance={instance}/>
    },{
      title: 'Audit Logs',
      element: <AuditLogs instance={instance}/>
    },{
      title: 'Backups',
      element: <Backups backups={instance?.backupArray} instance={instanceURL}/>
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
          <Heading size='lg'>{cap(server)} {cap(instanceURL)}</Heading>
          <small>PROMS maintenance panel</small>
        </Box>
        <TbMailExclamation size='1.5em' />
      </Box>

      <TabsMenu tabs={tabElements} my={10} />
    </Box>
  )
}
export default Instance