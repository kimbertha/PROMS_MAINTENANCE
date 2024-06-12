import { Box, Text } from '@chakra-ui/react'
import Status from  '../../components/status/Status'
import '../server.scss'
import { useNavigate } from 'react-router-dom'
import { strToNum } from '../../lib/functions'
import { TbMailExclamation } from 'react-icons/tb'
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
        <Text>File System</Text>
        <Text>Used</Text>
      </Box>
      <Box overflow='scroll' flexGrow={1}>
        {useValues?.map(d =><Box key={d.fileSystem} className='xsb'>
          <Text >{d.fileSystem}</Text>
          <Text style={{ color: color(d.use) }}>{d.use}</Text>
        </Box>
        )}
      </Box>
      <Text className='expand' onClick={() => navigate(`/${server.name}`)}>See More...</Text> 
    </>
  )


  const detailsMode = (
    <>
      <Text className='drives-titles'>Drives</Text>
      {useValues?.map(value => 
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
        <Status status={diskObj} title={ server.title} size='md'/>
        {!diskObj && <TbMailExclamation className='alert-icon' />}
      </Box>

      
      {diskObj && !serverMode && instanceMode}
      {serverMode && diskObj && detailsMode}
      {!diskObj && <Text>ERROR</Text>}
      

    </Box>
  )
}
export default ServerUnit