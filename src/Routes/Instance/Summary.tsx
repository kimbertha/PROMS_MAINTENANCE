import  { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Box, Heading, Text } from '@chakra-ui/react'
import { pingURL } from '../../lib/api'
import AuditLogs from './sections/AuditLogs'
import LogFiles from './sections/LogFiles'
import { HiOutlineStatusOnline } from 'react-icons/hi'
import { MdOutlineCrisisAlert } from 'react-icons/md'
import Backups from './sections/Backups'
import { getCronFreq, getLastBackup, getLastLogin } from '../../lib/functions/functions'
import { cap } from '../../lib/functions/helpers'
import moment from 'moment'

const Summary = ({  logFiles , server, instance }) => {
  const { server: serverURL } = useParams()
  const [pingStatus, setPingStatus] = useState(false)
  const backup = server?.backupArray && getLastBackup(server?.backupArray, instance.backupId) || null
  const cronFreq = server?.cronArray && backup && getCronFreq(server?.cronArray, instance.id, backup.date) 


  const pingInstance = async () => {
    const res = await axios.get(pingURL(serverURL, instance.id))
    setPingStatus(res.status === 200 ? true : false)
  }


  useEffect(() => {
    pingInstance()
  }, [])
  
  const details = [{
    title: 'Directories',
    details: [{
      header: 'URL',
      component: <Box display='flex' alignContent='center' alignItems='center'>
        {pingStatus ?  <HiOutlineStatusOnline color='green' /> :  <MdOutlineCrisisAlert color='red'/>}
        <a href={pingURL(serverURL, instance.id)}><Text ml={2}>{pingURL(serverURL, instance.id).split('/#')[0]}</Text></a>
      </Box>
    },{
      header: 'Output DIR',
      id: 'outputDir'
    },{
      header: 'Input DIR',
      id: 'inputDir'
    },{
      header: 'Historical DIR',
      id: 'historicalDir'
    }, {
      header: 'Last Login',
      component: <Text>{ server?.auditLogs && getLastLogin(server.auditLogs).username}</Text>
    }]
  },
  {
    title: 'Database',
    details: [{
      header: 'Name',
      id: 'databaseURL'
    },
    {
      header: 'Last Backup Date',
      component: <Text>{  moment(backup?.date).format('Do MMMM YYYY')}</Text>
    },{
      header: 'Last Backup Size',
      component: <span style={{ color: backup?.size === '0' ? 'red' : 'auto' }}>{backup?.size}</span>
    }
    ,{
      header: 'Backup Frequency',
      component: cronFreq &&  <span style={{ color: cronFreq?.check ? 'green' : 'red' }}>{cap(cronFreq?.path)}</span>
    }
    ]
  }]

  if (!server) return null

  return (
    <>
      <Box display='flex' mb={5}>
        <Box border='1px solid lightgrey' px={5} py={2} mr={5}>
          {details.map(section =>  
            <Box key={section.title}>
              <Heading mt={3} size='sm' >{section.title}</Heading>
              {section.details.map(detail => 
                <Box key={detail.header}>
                  <Heading color='lightGrey' mt={2} size='xs'>{detail.header}</Heading>
                  {detail.component ? detail.component : <Text>{server?.[detail.id]}</Text>}
                </Box>
              )}
            </Box>
          )}
        </Box>

        <Box flexGrow={1}>
          {instance.api && <AuditLogs auditLogs={server?.auditLogs} />}
        </Box>
        
      </Box>

      <LogFiles logFiles={logFiles} height='60vh'/>
      <Backups instance={instance} backups={server?.backupArray} />

    </>
    
  )
}
export default Summary

