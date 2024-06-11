import { Box, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from '../components/table/Table'
import './instance.scss'
import { useParams } from 'react-router-dom'
import { dataURL, headers, pingURL, logFilesURL } from '../lib/api'
import { Heading } from '@chakra-ui/react'
import { cap } from '../lib/functions'
import { colors } from '../lib/vars'
import Status from '../components/status/Status'

const Instance = () => {
  const [instance, setInstance] = useState<any>()
  const [pingStatus, setPingStatus] = useState(false)
  const { server, instance: instanceURL }  = useParams()
  const nameColors = Array.from(new Set(instance?.auditLogs.map(log => log.username)))



  const getInstance = async () => {
    const logFiles = ((await axios.get(logFilesURL(server, instanceURL), headers)).data)
    const instance = (await axios.get(dataURL(server, instanceURL), headers)).data
    setInstance({ ...instance, logFiles: logFiles })

  }

  const pingInstance = async () => { 
    const res = await axios.get(pingURL(server, instanceURL))
    setPingStatus(res.status === 200  ? true : false)
  }

  useEffect(() => {
    getInstance()
  }, [])
  
  const tableRows = [
    { header: 'Session',
      id: 'sessionId'
    },
    { header: 'Event',
      id: 'eventId'
    },
    { header: 'Enquiry',
      id: 'enquiryId'
    },
    { header: 'Customer',
      id: 'customer'
    },
    { header: 'Username',
      id: 'username',
      component: ({ username }) => <p style={{ color: colors[nameColors.indexOf(username)] }}>{username}</p>
    },
    { header: 'Created',
      id: 'created'
    },
    { header: 'Description',
      id: 'description'
    }]


  console.log(instance)

  if (!instance) return null
  return (
    <Box>
      <Heading size='lg'>{cap(server)} {cap(instanceURL)}</Heading>

      <Box my={10}>
        <Heading size='md'>URL</Heading>
        <Box display='flex' alignContent='center' alignItems='center'>
          <Status status={pingStatus} />
          <p>{pingURL(server, instanceURL)}</p>
        </Box>
        <Button onClick={pingInstance}>PING</Button>
      </Box>

      <Box my={10}>
        <Heading size='md'>Database</Heading>
        <p>Database URL: {instance.databaseURL}</p>
      </Box>

      <Box my={10}>
        <Heading size='md'>DIR</Heading>
        <p>Output: {instance.outputDir}</p>
        <p>Input: {instance.inputDir}</p>
        <p>Historical: {instance.historicalDir}</p>
      </Box>

      <Box className='audits-container' my={10}>
        <Heading size='md'>Audit Logs</Heading>
        <Table rows={tableRows} columns={instance?.auditLogs} />
      </Box>

      <Box className='cron-container' my={10}>
        <Heading size='md'>Cron Array</Heading>
        {instance.cronArray?.map((cron, i) => <Box key={i}>{cron}</Box>)}
      </Box>

      <Box className='bakcups-container' my={10}>
        <Heading size='md'>Cron Array</Heading>
        {instance.backupArray?.map((cron, i) => <Box key={i}>{cron}</Box>)}
      </Box>

      <Box className='logfiles-container' my={10}>
        <Heading size='md'>Logfiles</Heading>
        {instance.logFiles?.map((log, i) => <Box key={i}>{log}</Box>)}
      </Box>
    </Box>
  )
}
export default Instance