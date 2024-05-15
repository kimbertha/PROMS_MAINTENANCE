import { Box } from '@chakra-ui/react'
import Status from '../components/status/Status'
import { useNavigate } from 'react-router-dom'

interface InstanceUnitProps {
  server: string;
  instance: any;
}

const InstanceUnit = ({  instance , server }: InstanceUnitProps) => {
  const navigate = useNavigate()
  const border = instance.error ? 'rgba(206, 69, 69,0.8)' : 'rgba(36, 36, 36, 0.9)'
  
  const details = [{
    title: 'Historical',
    field: 'historicalDir'
  }
  ,
  { title: 'Input',
    field: 'inputDir'
  },
  { title: 'Output',
    field: 'outputDir'
  }]

  return (
    <Box className='instance-container' style={{ borderTop: `20px solid ${border}` }}>

      <Box display='flex' alignItems='center' mb={10}>
        <Status status={instance.error} mr={8} />
        <p style={{ fontSize: '1.1em', fontWeight: 700 }}>{instance.title}</p>
      </Box>
      
      {instance.error ?
        <p>{instance.error}</p> :
        <>
          <Box flexGrow={1}>
            {details.map(d => 
              <Box className='xsb' key={d.field}>
                <p className='bold'>{d.title}</p>
                <p>{instance[d.field]}</p>
              </Box>
            )}
            <Box mt={10}>
              <p className='bold'>Database</p>
              <p>{instance.databaseURL}</p>
            </Box>
    
          </Box>
      
          <p className='expand' onClick={() => navigate(`${server}/${instance.id}`)}>See More...</p>
        </>
      }
    </Box>
  )
}
export default InstanceUnit