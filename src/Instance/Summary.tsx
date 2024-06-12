import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Box, Button, Heading,  Text } from '@chakra-ui/react'

import { pingURL } from '../lib/api'
import AuditLogs from './AuditLogs'
import LogFiles from './LogFiles'
import Status from '../components/status/Status'
import Cron from './Cron'
import Backups from './Backups'
import Table from '../components/table/Table'

const Summary = ({ instance }) => {
  const { server, instance: instanceURL } = useParams()
  const [pingStatus, setPingStatus] = useState(false)

  const pingInstance = async () => {
    const res = await axios.get(pingURL(server, instanceURL))
    setPingStatus(res.status === 200 ? true : false)
  }

  useEffect(() => {
    pingInstance()
  }, [])
  
  const tableRows = [{
    header: 'Output DIR',
    id: 'outputDir'
  },{
    header: 'Input DIR',
    id: 'inputDir'
  },{
    header: 'Historical DIR',
    id: 'historicalDir'
  }]
  
  if (!instance) return null

  return (
    <>
        
      <Box display='flex'>
        <Box className='details'>
          <Heading color='lightGrey' mt={2} size='xs'>URL</Heading>
          <Box display='flex' alignContent='center' alignItems='center'>
            <Status status={pingStatus} />
            <Text>{pingURL(server, instanceURL).split('/#')[0]}</Text>
          </Box>
          <Heading color='lightGrey' mt={2} size='xs'>Database</Heading>
          <Text>{instance?.databaseURL}</Text>
          <Heading color='lightGrey' mt={2} size='xs'>OutputDIR</Heading>
          <Text>{instance?.outputDir}</Text>
          <Heading color='lightGrey' mt={2} size='xs'>InputDIR</Heading>
          <Text>{instance?.inputDir}</Text>
          <Heading color='lightGrey' mt={2} size='xs'>HistoricalDIR</Heading>
          <Text>{instance?.historicalDir}</Text>
        </Box>
        <AuditLogs instance={instance} />

      </Box>
      {/* <Table columns={[instance]} rows={tableRows} /> */}

      
      {/* <AuditLogs instance={instance} /> */}
      <Cron instance={instance} />

      <Backups instance={instance}/>
      <LogFiles instance={instance}/>
    </>
    
  )
}
export default Summary

