import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { dataURL, serverDiskSplitURL, serverLogFilesURL, serverMemoryUrl } from '../../lib/api'
import { Box, Heading, Text } from '@chakra-ui/react'
import { constructDsArray, getMemoryValues } from '../../lib/functions/functions'
import { cap, strToNum } from '../../lib/functions/helpers'
import { dataObj } from '../../lib/api'
import AGGrid from '../../components/AGGrid/AGGrid'
import TerminalConatiner from '../../components/terminal-container/TerminalContainer'
import { apiCaller } from '../../lib/hooks'

const Server = () => {
  const { server: serverId } = useParams()
  const main = dataObj.filter(obj => obj.id === serverId)[0].main

  const memory = apiCaller(serverMemoryUrl(serverId, main))

  const serverLogs = apiCaller(serverLogFilesURL(serverId, main))
  const diskSplit = apiCaller(serverDiskSplitURL(serverId, main))
  const server = apiCaller(dataURL(serverId, main))


  
  const tableCols = [
    { field: 'fileSystem',
      headerName: 'File System'
    },
    { field: 'use',
      headerName: 'Use',
      sortingOrder: ['desc'],
      cellRenderer: ({ value }) => <p style={{ color: strToNum(value) > 80 ? 'red' : 'auto' }}> {value}</p> 

    },
    {
      field: 'used',
      headerName: 'Used'
    },
    { field: 'size',
      headerName: 'Size'
    },
    { field: 'avail',
      headerName: 'Avail'
    },
    { field: 'mountedOn',
      headerName: 'Mounted On'
    }]
  
  
  return (
    <Box>

      <Heading>{cap(serverId)}</Heading>
      {server.data && <AGGrid rows={constructDsArray(server.data.dsArray)} columns={tableCols} pagination={false} />}

      <Box>
        <Heading>Server Logs</Heading>
        <TerminalConatiner loading={serverLogs.loading} height='60vh'>
          {serverLogs.data && serverLogs?.data.map((log, i) => <p key={i}>{log}</p>)}
        </TerminalConatiner>
      </Box>

      <Box>
        <Heading>Disk Split</Heading>
        <TerminalConatiner loading={memory.loading} height='60vh'>
          {diskSplit.data && diskSplit?.data.map((log, i) => <p key={i}>{log}</p>)}
        </TerminalConatiner>
      </Box>
      
      {memory.data &&
        <Box>
          <Heading>Memory</Heading>
          <Text>{getMemoryValues(memory.data)}</Text>
        </Box>
      }

      <Box>
        <Heading>CRON</Heading>
        <Box className='server-logs-container'>
          {server.data && server?.data.cronArray && server?.data.cronArray.map((log,i) => <p key={i}>{log}</p>)}
        </Box>
      </Box>


    </Box>
  )
}
export default Server