import { Box } from '@chakra-ui/react'
import React from 'react'
import Table from '../components/table/Table'
import './instance.scss'

const Instance = ({ instance }) => {
  console.log(instance)

  
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
    }
    
  ]
  return (
    <Box>
      <h1>INSTANCE</h1>

      <Box className='audits-container'>
        <h3>Audit Logs</h3>
        <Table rows={tableRows} columns={instance.auditLogs} />
      </Box>

    </Box>
  )
}
export default Instance