import { useState }  from 'react'
import { Box } from '@chakra-ui/react'
import Status from  '../components/status/Status'
import './server.scss'
import { useNavigate } from 'react-router-dom'
import { BellIcon } from '@chakra-ui/icons'

interface ServerUnitProps {
  server: any;
  serverMode: boolean;
}

const ServerUnit = ({ server, serverMode }: ServerUnitProps) => {
  const [serverErr, setServerErr] = useState<boolean>(true)
  const navigate = useNavigate()



  console.log(server)
  const stringToNum = (string) => Number(string.substring(0, string.length - 1))
  const arr = server.dsArray.map((string: string) => string.split(' ').filter(str => str !== '')).slice(1)
  const diskObj = arr.map(([fileSystem, size, used, avail, use, mountedOn]) => ({ fileSystem, size, used, avail, use, mountedOn }))
  const withUse = diskObj.filter(disk =>  stringToNum(disk.use) >= 0).sort((a,b) => stringToNum(b.use) - stringToNum(a.use))

  const height = serverMode ? 'auto' : 'calc(100vh/4)' 
  const borderColor = serverErr ? 'red' : 'rgb(36, 36, 36)'

  return (
    <Box className='server-container'
      height={height} style={{ borderTop: `20px solid ${borderColor}` }}
    >
      {server?.server}

      <Box mb={3} className='xsb'>
        <Box display='flex' alignItems='center'>
          <Status status={serverErr} mr={8} />
          <p className='server-title'>Server Name</p>
        </Box>
        <BellIcon className='bell-icon'/>
      </Box>

      <Box className='xsb drives-titles'>
        <p>File System</p>
        <p>Used</p>
      </Box>

        
      <Box overflow='scroll' flexGrow={1}>
        {withUse.map((disk,i) =>
          <Box key={i} className='xsb'>
            <p >{disk.fileSystem}</p>
            <p style={{ color: stringToNum(disk.use) > 80 ? 'red' : 'black' }}>{disk.use}</p>
          </Box>)}
      </Box>

      {serverMode &&
        <>
          <Box my={10}>
            <p className='bold'> Database</p>
            <p>{server.databaseURL}</p>
          </Box>
          <Box my={10}>
            <p  className='bold'> Input</p>
            <p>{server.inputDir}</p>
          </Box>
          <Box my={10}>
            <p  className='bold'>Historical</p>
            <p>{server.historicalDir}</p>
          </Box>
          <Box my={10}>
            <p  className='bold'>Output</p>
            <p>{server.outputDir}</p>
          </Box>
        </>
      }

      <p className='expand' onClick={() => navigate(`/${server.name}`)}>See More...</p>
    </Box>
  )
}
export default ServerUnit