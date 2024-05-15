import { Box } from '@chakra-ui/react'
import Status from  '../components/status/Status'
import './server.scss'
import { useNavigate } from 'react-router-dom'
import { BellIcon } from '@chakra-ui/icons'
import { strToNum } from '../functions'

interface ServerUnitProps {
  server: any;
  serverMode: boolean;
}

const ServerUnit = ({ server, serverMode }: ServerUnitProps) => {
  const navigate = useNavigate()
  
  const diskObj = server.instances.filter(instance => !instance.error)[0]?.dsArray

  const useValues = diskObj ? 
    diskObj.filter(drive => drive.fileSystem.includes('/dev') && strToNum(drive.use) >= 0)
      .sort((a, b) => strToNum(b.use) - strToNum(a.use)) : null

  
  const height = serverMode ? 'auto' : 'calc(100vh/4)' 
  const borderColor = !diskObj ? 'red' : 'rgb(36, 36, 36)'
  const color = (use) => strToNum(use) > 80 ? 'red' : 'black' 


  const details = [
    { field: 'fileSystem',
      title: 'FileSystem' 
    },
    { field: 'avail',
      title: 'Avail' 
    },
    { field: 'mountedOn',
      title: 'Mounted On' 
    },
    { field: 'size',
      title: 'Size' 
    },
    { field: 'use',
      title: 'Use' 
    },
    { field: 'used',
      title: 'Used'
    }
  ]
  

  const instanceMode = (
    <>
      <Box className='xsb drives-titles'>
        <p>File System</p>
        <p>Used</p>
      </Box>
      <Box overflow='scroll' flexGrow={1}>
        {useValues.map(disk =>
          <Box key={disk.fileSystem} className='xsb'>
            <p >{disk.fileSystem}</p>
            <p style={{ color: color(disk.use) }}>{disk.use}</p>
          </Box>)}
      </Box>
      <p className='expand' onClick={() => navigate(`/${server.name}`)}>See More...</p> 
    </>
  )


  const detailsMode = (
    <>
      <p className='bold'>Drives</p>
      {useValues.map(value => 
        <Box my={10}>
          {details.map(detail =>
            <Box key={detail.field} className='xsb'>
              <p className='bold'>{detail.title}</p>
              {detail.field === 'use' ?
                <p style={{ color: color(value.use) }}>{value.use} </p>
                : <p>{value[detail.field]}</p>
              }
            </Box>
          )}
        </Box>
      )
      }
    </>
  )

  return (

    <Box className='server-container'
      height={height} style={{ borderTop: `20px solid ${borderColor}` }}>

      <Box mb={3} className='xsb'>
        <Box display='flex' alignItems='center'>
          <Status status={!diskObj} mr={8} />
          <p className='server-title'>{server.title}</p>
        </Box>
        {!diskObj && <BellIcon className='bell-icon' />}
      </Box>

      
      {diskObj && !serverMode && instanceMode}
      {serverMode && diskObj && detailsMode}
      {!diskObj && <p>ERROR</p>}
      

    </Box>
  )
}
export default ServerUnit