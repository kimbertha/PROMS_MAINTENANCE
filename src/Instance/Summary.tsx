import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Box, Button, Heading } from '@chakra-ui/react'

import { pingURL } from '../lib/api'
import AuditLogs from './AuditLogs'
import LogFiles from './LogFiles'
import Status from '../components/status/Status'
import Cron from './Cron'
import Backups from './Backups'

const Summary = ({ instance }) => {
  const { server, instance: instanceURL } = useParams()
  const [pingStatus, setPingStatus] = useState(false)

  const pingInstance = async () => {
    const res = await axios.get(pingURL(server, instanceURL))
    setPingStatus(res.status === 200 ? true : false)
  }

  useEffect(() => {
    pingInstance()
  },[])

  return (
    <>
      <Box display='flex'>
        
        <Box className=''>
          <Heading mt={2} size='xs'>URL</Heading>
          <Box display='flex' alignContent='center' alignItems='center'>
            <Status status={pingStatus} />
            <p>{pingURL(server, instanceURL).split('/#')[0]}</p>
          </Box>
          <Heading mt={2} size='xs'>Database</Heading>
          <p>{instance?.databaseURL}</p>
          <Heading mt={2} size='xs'>OutputDIR</Heading>
          <p>{instance?.outputDir}</p>
          <Heading mt={2} size='xs'>InputDIR</Heading>
          <p>{instance?.inputDir}</p>
          <Heading mt={2} size='xs'>HistoricalDIR</Heading>
          <p>{instance?.historicalDir}</p>
        </Box>

        <Box width='80%'>
          <AuditLogs instance={instance} />
        </Box>
      
      </Box>

      <Cron instance={instance} />
      <Backups instance={instance}/>
      <LogFiles instance={instance}/>
    </>
    
  )
}
export default Summary

