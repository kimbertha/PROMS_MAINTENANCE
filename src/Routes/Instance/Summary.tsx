import  { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Box, Heading,  Text } from '@chakra-ui/react'

import { logFilesURL, pingURL } from '../../lib/api'
import AuditLogs from './AuditLogs'
import LogFiles from './LogFiles'
import Status from '../../components/status/Status'
import Cron from './Cron'
import Backups from './Backups'

const Summary = ({ instance, logFiles , server }) => {
  const { server: serverURL, instance: instanceURL } = useParams()
  const [pingStatus, setPingStatus] = useState(false)

  const pingInstance = async () => {
    const res = await axios.get(pingURL(serverURL, instanceURL))
    setPingStatus(res.status === 200 ? true : false)
  }

  console.log(logFiles)

  useEffect(() => {
    pingInstance()
  }, [])
  
  const details = [
    {
      header: 'URL',
      component: <Box display='flex' alignContent='center' alignItems='center'>
        <Status status={pingStatus} />
        <a href={pingURL(serverURL, instanceURL)}><Text>{pingURL(serverURL, instanceURL).split('/#')[0]}</Text></a>
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
        
      <Box display='flex'>
        <Box display='flex' flexDirection='column'>
          <Heading size='md'>Details</Heading>
          <Box className='details' flexGrow={1}>
            {details.map(detail =>  
              <Box key={detail.header}>
                <Heading color='lightGrey' mt={2} size='xs'>{detail.header}</Heading>
                {detail.component ? detail.component : <Text>{instance?.[detail.id]}</Text>}
              </Box>
            )}
          </Box>
        </Box>
        <AuditLogs auditLogs={server?.auditLogs} />
      </Box>
      
      <LogFiles logFiles={logFiles}/>
      {instance && <Cron instance={instance} />}
      <Backups instance={instanceURL} server={serverURL} backups={server?.backupArray} />

    </>
    
  )
}
export default Summary

