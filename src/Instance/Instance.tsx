import { Box, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from '../components/table/Table'
import './instance.scss'
import { useParams } from 'react-router-dom'
import { dataURL, headers, pingURL } from '../lib/api'
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
    setInstance((await axios.get(dataURL(server, instanceURL), headers)).data)
  }

  const pingInstance = async () => { 
    const res = await axios.get(pingURL(server, instanceURL))
    console.log(res.status === 200)
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

    </Box>
  )
}
export default Instance