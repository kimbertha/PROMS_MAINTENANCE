import  { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Box, Heading,  Text } from '@chakra-ui/react'

import { pingURL } from '../../lib/api'
import AuditLogs from './sections/AuditLogs'
import LogFiles from './sections/LogFiles'
import Status from '../../components/status/Status'
import Backups from './sections/Backups'

const Summary = ({  logFiles , server, instance }) => {
  const { server: serverURL } = useParams()
  const [pingStatus, setPingStatus] = useState(false)

  const pingInstance = async () => {
    const res = await axios.get(pingURL(serverURL, instance.id))
    setPingStatus(res.status === 200 ? true : false)
  }

  useEffect(() => {
    pingInstance()
  }, [])
  
  const details = [
    {
      header: 'URL',
      component: <Box display='flex' alignContent='center' alignItems='center'>
        <Status status={pingStatus} />
        <a href={pingURL(serverURL, instance.id)}><Text>{pingURL(serverURL, instance.id).split('/#')[0]}</Text></a>
      </Box>
    },
    {
      header: 'Database',
      id: 'databaseURL'
    },{
      header: 'Output DIR',
      id: 'outputDir'
    },{
      header: 'Input DIR',
      id: 'inputDir'
    },{
      header: 'Historical DIR',
      id: 'historicalDir'
    }]

  if (!server) return null

  return (
    <>

      <Box className='details' mb={5}>
        <Heading size='md'>Details</Heading>
        {details.map(detail =>  
          <Box key={detail.header}>
            <Heading color='lightGrey' mt={2} size='xs'>{detail.header}</Heading>
            {detail.component ? detail.component : <Text>{server?.[detail.id]}</Text>}
          </Box>
        )}
      </Box>


      {instance.api && <AuditLogs auditLogs={server?.auditLogs} />}
      <LogFiles logFiles={logFiles} height='60vh'/>
      <Backups instance={instance} backups={server?.backupArray} />

    </>
    
  )
}
export default Summary

