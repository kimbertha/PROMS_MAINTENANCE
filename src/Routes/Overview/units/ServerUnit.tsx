import { Box, Text } from '@chakra-ui/react'
import Status from  '../../../components/status/Status'
import { useNavigate } from 'react-router-dom'
import { getMemoryValues, strToNum } from '../../../lib/functions'
import { TbMailExclamation } from 'react-icons/tb'
import { apiCaller } from '../../../lib/hooks'
import '../overview.scss'
import { serverMemoryUrl } from '../../../lib/api'
interface ServerUnitProps {
  server: any;
  serverMode: boolean;
}

const ServerUnit = ({ server, serverMode }: ServerUnitProps) => {
  const navigate = useNavigate()
  
  const activeInstance = server.instances.filter(instance => !instance.error)[0]
  const dsArray = activeInstance?.dsArray
  const memory = apiCaller(serverMemoryUrl(server.id, server.main))

  const height = serverMode ? 'auto' : 'calc(100vh/3.8)' 
  const borderColor = !dsArray ? 'red' : 'rgb(36, 36, 36)'
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
      {memory.data &&
        <Box className='xsb' my='5px'>
          <Text className='drives-titles'>RAM Usage</Text>
          <Text fontSize='xs'>{memory.data && getMemoryValues(memory)}</Text>
        </Box>
      }

      <Box className='xsb drives-titles'>
        <Text>File System</Text>
        <Text>Used</Text>
      </Box>
      <Box overflow='scroll' flexGrow={1}>
        {dsArray?.map(d =><Box key={d.fileSystem} className='xsb'>
          <Text >{d.fileSystem}</Text>
          <Text style={{ color: color(d.use) }}>{d.use}</Text>
        </Box>
        )}
      </Box>
      <Text className='expand' onClick={() => navigate(`/${server.id}`)}>See More...</Text> 
    </>
  )


  const detailsMode = (
    <>
      {memory.data &&
        <Box className='xsb' my='5px'>
          <Text className='drives-titles'>RAM Usage</Text>
          <Text fontSize='xs'>{memory.data && getMemoryValues(memory)}</Text>
        </Box>
      }
      
      <Text className='drives-titles'>Drives</Text>
      {dsArray?.map(value => 
        <Box pb={2} my={2} key={value.fileSystem} borderBottom='1px solid lightgrey'>
          {details.map(d => <Box key={d.field} className='xsb'>
            <Text className='bold'>{d.title}</Text>
            <Text style={{ color: d.field === 'use' && color(value.use) }}>{value[d.field]} </Text>
          </Box>
          )}
        </Box>
      )}
    </>
  )


  return (

    <Box className='server-container'
      height={height} style={{ borderTop: `20px solid ${borderColor}` }}>

      <Box mb={1} className='xsb'>
        <Status status={dsArray} title={ server.title} size='md'/>
        {!dsArray && <TbMailExclamation className='alert-icon' />}
      </Box>

      

      
      {dsArray && !serverMode && instanceMode}
      {serverMode && dsArray && detailsMode}
      
      {!dsArray && <Text>ERROR</Text>}
      

    </Box>
  )
}
export default ServerUnit