import React from 'react'
import { Box, Heading } from '@chakra-ui/react'
import { colors } from '../../lib/vars'
import AGGrid from '../../components/AGGrid/AGGrid'

const AuditLogs = ({ auditLogs }) => {
  if (!auditLogs) return null

  const nameColors = Array.from(new Set(auditLogs.map(log => log.username)))
  const customerColors = Array.from(new Set(auditLogs.map(log => log.customer)))

  const AGGridCols = [
    { headerName: 'Username',
      field: 'username',
      cellRenderer: ({ value }) => <p style={{ color: colors[nameColors.indexOf(value)] }}>{value}</p>
    },
    { headerName: 'Customer',
      field: 'customer'
      // cellRenderer: ({ value }) => <p style={{ color: colors[c.indexOf(value)] }}>{value}</p>
    },
    { headerName: 'Event',
      field: 'eventId'
    },
    { headerName: 'Description',
      field: 'description'
    },
    { headerName: 'Created',
      field: 'created'
    }
  ]
  
  return (

    <Box className='audits-container' flexGrow={1} mx={2}>
      <Heading size='md'>Audit Logs</Heading>
      <AGGrid rows={auditLogs} columns={AGGridCols} />

    </Box>
      

  )
}
export default AuditLogs