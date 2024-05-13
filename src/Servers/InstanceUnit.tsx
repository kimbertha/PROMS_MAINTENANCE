import React from 'react'
import { Box } from '@chakra-ui/react'
import Status from '../components/status/Status'
import { useNavigate } from 'react-router-dom'

interface InstanceUnitProps {
  instance: any;
  serverErr: boolean;
}



const InstanceUnit = ({ instance, serverErr }: InstanceUnitProps) => {
  const borderColor = ''
  const navigate = useNavigate()
  
  return (
    <Box className='unit-container' display='flex'
      flexDirection='column'
      style={{ borderTop: `15px solid ${serverErr ? 'rgba(206, 69, 69,0.8)' : 'rgba(36, 36, 36, 0.9)'}` }}>

      
      <Box display='flex' alignItems='center' mb={10}>
        <Status status={serverErr} mr={8} />
        <p style={{ fontSize: '1.1em', fontWeight: 700 }}>Instance Name</p>
      </Box>

      <Box className='drives-values' flexGrow={1}>

        <Box className='xsb'>
          <p> Name : </p>
          <p>{instance.name}</p>
        </Box>
        <Box className='xsb'>
          <p> Input : </p>
          <p>{instance.input}</p>
        </Box>
        <Box className='xsb'>
          <p> History : </p>
          <p>{instance.history}</p>
        </Box>
        <Box className='xsb'>
          <p> Database : </p>
          <p>{instance.database}</p>
        </Box>
      </Box>
      
      <p className='expand' onClick={() =>navigate(`/${instance.name}`) }>See More...</p>

    </Box>
  )
}
export default InstanceUnit