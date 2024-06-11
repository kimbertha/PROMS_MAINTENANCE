import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Box, Heading, Button  } from '@chakra-ui/react'
import { dataURL, headers } from '../lib/api'
import { cap } from '../lib/functions'

import TabsMenu from '../components/page-menu/TabsMenu'
import Backups from './Backups'
import Cron from './Cron'
import AuditLogs from './AuditLogs'
import Summary from './Summary'

import './instance.scss'
import LogFiles from './LogFiles'


const Instance = () => {
  const [instance, setInstance] = useState<any>(null)
  const { server, instance: instanceURL } = useParams()


  const getInstance = async () => {
    // const logFiles = ((await axios.get(logFilesURL(server, instanceURL), headers)).data)
    const logFiles = ((await axios.get('https://delta.radleypropertysolutions.com/test/promsrest/getmpanellogfile/demo', headers)).data)
    const instance = (await axios.get(dataURL(server, instanceURL), headers)).data
    setInstance({ ...instance, logFiles: logFiles })
  }

  useEffect(() => {
    getInstance()
  }, [])
  

  const tabElements = [{
    title: 'Summary',
    element: <Summary instance={instance}/>
  },{
    title: 'Audit Logs',
    element: <AuditLogs instance={instance}/>
  },{
    title: 'Backups',
    element: <Backups instance={instance}/>
  },{
    title: 'Cron',
    element: <Cron instance={instance}/>
  },
  {
    title: 'Log Files',
    element: <LogFiles instance={instance}/>
  }]
  

  return (
    <Box className='container'>
      <Heading size='lg'>{cap(server)} {cap(instanceURL)}</Heading>
      <TabsMenu tabs={tabElements} my={10} />
    </Box>
  )
}
export default Instance