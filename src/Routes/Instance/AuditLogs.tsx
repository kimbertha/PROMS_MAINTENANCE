import React from 'react'
import { Box, Heading } from '@chakra-ui/react'
import Table from '../../components/table/Table'
import { colors } from '../../lib/vars'
import AGGrid from '../../components/AGGrid/AGGrid'

const AuditLogs = ({ instance }) => {
  
  const nameColors = Array.from(new Set(instance?.auditLogs.map(log => log.username)))
  const customerColors = Array.from(new Set(instance?.auditLogs.map(log => log.customer)))


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
  
  const tableCols = [
    { field: 'fileSystem',
      headerName: 'File System'
    },
    { field: 'size',
      headerName: 'Size'
    },
    { field: 'used',
      headerName: 'Used'
    },
    { field: 'avail',
      headerName: 'Avail'
    },
    { field: 'use',
      headerName: 'Use'
    },
    { field: 'mountedOn',
      headerName: 'Mounted On'
    }]

  
  if (!instance) return null
  return (

    <Box className='audits-container' flexGrow={1} mx={2}>
      <Heading size='md'>Audit Logs</Heading>
      <AGGrid rows={instance.auditLogs} columns={AGGridCols} />

    </Box>
      

  )
}
export default AuditLogs