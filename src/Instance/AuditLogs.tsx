import React from 'react'
import { Box, Heading } from '@chakra-ui/react'
import Table from '../components/table/Table'
import { colors } from '../lib/vars'


const AuditLogs = ({ instance }) => {
  
  const nameColors = Array.from(new Set(instance?.auditLogs.map(log => log.username)))


  const tableRows = [
    { header: 'Username',
      id: 'username',
      component: ({ username }) => <p style={{ color: colors[nameColors.indexOf(username)] }}>{username}</p>
    },
    { header: 'Customer',
      id: 'customer'
    },
    { header: 'Event',
      id: 'eventId'
    },
    { header: 'Description',
      id: 'description'
    }
    // { header: 'Session',
    //   id: 'sessionId'
    // },
    // { header: 'Enquiry',
    //   id: 'enquiryId'
    // },
    // { header: 'Created',
    //   id: 'created'
    // },
  ]
  
  if (!instance) return null
  return (
    <>
      <Box className='audits-container'>
        <Heading size='md'>Audit Logs</Heading>
        <Table rows={tableRows} columns={instance.auditLogs} />
      </Box>
      
    </>
  )
}
export default AuditLogs