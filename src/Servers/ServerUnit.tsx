import React from 'react'
import { Box, Stat } from '@chakra-ui/react'
import Status from  '../components/status/Status'
import './server.scss'
import { useNavigate } from 'react-router-dom'

interface ServerUnitProps {
  server: any;
  serverErr: boolean;
}

const ServerUnit = ({ server, serverErr }: ServerUnitProps) => {
  const navigate = useNavigate()

  const stringToNum = (string) => Number(string.substring(0, string.length - 1))

  const arr = server.dsArray.map((string: string) => string.split(' ').filter(str => str !== '')).slice(1)
  const diskObj = arr.map(([fileSystem, size, used, avail, use, mountedOn]) => ({ fileSystem, size, used, avail, use, mountedOn }))
  const withUse = diskObj.filter(disk =>  stringToNum(disk.use) > 0).sort((a,b) => stringToNum(b.use) - stringToNum(a.use))

  return (
    <Box className='unit-container' display='flex' flexDirection='column'
      style={{ borderTop: `15px solid ${serverErr ? 'red' : 'rgb(36, 36, 36)'}` }}
    >

      <Box mb={3} display='flex' alignItems='center'>
        <Status status={serverErr} mr={8} />
        <p className='title'>Server Name</p>
      
      </Box>

      <Box className='xsb drives-titles'>
        <p>File System</p>
        <p>Used</p>
      </Box>

        
      <Box className='drives-values' flexGrow={1}>
        {withUse.map(disk =>
          <Box key={disk.fileSystem} className='xsb'>
            <p >{disk.fileSystem}</p>
            <p style={{ color: stringToNum(disk.use) > 80 ? 'red' : 'black' }}>{disk.use}</p>
          </Box>)}
          
      </Box>

      <p className='expand' onClick={() => navigate('/serverName')}>See More...</p>

    

    </Box>
  )
}
export default ServerUnit