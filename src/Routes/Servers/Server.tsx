import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { dataURL, headers, serverLogFilesURL } from '../../lib/api'
import { Box, Heading } from '@chakra-ui/react'
import { cap, constructDsArray } from '../../lib/functions'
import { dataObj } from '../../lib/api'
import AGGrid from '../../components/AGGrid/AGGrid'

const Server = () => {
  const { server: serverId } = useParams()
  const [serverLogs, setServerLogs] = useState([])
  const [server, setServer] = useState<any>(null)
  const [dsArray, setDsArray] = useState([])
  
  const main = dataObj.filter(obj => obj.id === serverId)[0].main

  useEffect(() => {
    getServerData()
    getServerLogs()
  }, [])

  const getServerLogs = async () => {
    setServerLogs((await axios.get(serverLogFilesURL(serverId, main), headers)).data)
  }
  
  const getServerData = async () => {
    setServer((await axios.get(dataURL(serverId, main), headers)).data)
  }


  useEffect(() => {
    
    server && setDsArray(constructDsArray(server.dsArray))
  }, [server])
  
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
  


  

  console.log(dsArray)
  if (!server) return null
  return (
    <Box>

      <Heading>{cap(serverId)}</Heading>
      <AGGrid rows={constructDsArray(server.dsArray)} columns={tableCols} pagination={false} />

      <Box>
        <Heading>Server Logs</Heading>
        <Box className='server-logs-container'>
          {serverLogs?.map((log,i) => <p key={i}>{log}</p>)}
        </Box>
      </Box>

      <Box>
        <Heading>CRON</Heading>
        <Box className='server-logs-container'>
          {server?.cronArray && server?.cronArray.map((log,i) => <p key={i}>{log}</p>)}
        </Box>
      </Box>


    </Box>
  )
}
export default Server