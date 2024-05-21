import { Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from '../components/table/Table'
import './instance.scss'
import { useParams } from 'react-router-dom'
import { dataURL, headers } from '../lib/api'
import { cap } from '../lib/functions'

const Instance = () => {
  const [instance, setInstance] = useState<any>()
  const { server, instance: instanceURL }  = useParams()


  const getInstance = async () => {
    setInstance((await axios.get(dataURL(server, instanceURL), headers)).data)
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
      id: 'username'
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
      <h1>{cap(server)} {cap(instanceURL)}</h1>

      <Box my={20}>
        <h3>Database</h3>
        <p>Database URL: {instance.databaseURL}</p>
      </Box>

      <Box my={20}>
        <h3>DIR</h3>
        <p>Output: {instance.outputDir}</p>
        <p>Input: {instance.inputDir}</p>
        <p>Historical: {instance.historicalDir}</p>
      </Box>

      <Box className='audits-container' my={20}>
        <h3>Audit Logs</h3>
        <Table rows={tableRows} columns={instance?.auditLogs} />
      </Box>

    </Box>
  )
}
export default Instance