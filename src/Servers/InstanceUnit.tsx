import { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import axios from 'axios'
import Status from '../components/status/Status'
import { useNavigate } from 'react-router-dom'

interface InstanceUnitProps {
  instance: any;
  setSelected: any;
  server: any;
}

const InstanceUnit = ({  instance, setSelected }: InstanceUnitProps) => {
  const [instanceErr, setInstanceErr] = useState(false)
  const navigate = useNavigate()
  const border = instanceErr ? 'rgba(206, 69, 69,0.8)' : 'rgba(36, 36, 36, 0.9)'


  const checkInstance = async () => {
    try {
      const req = (await axios.get('https://echo.radleypropertysolutions.com/test')).status
      req === 200 && setInstanceErr(false)
    } catch (err) {
      // console.log(err)
      setInstanceErr(true)
    }
  }

  useEffect(() => {
    checkInstance()
  }, [])
  

  
  return (
    <Box className='instance-container' style={{ borderTop: `20px solid ${border}` }}>

      
      <Box display='flex' alignItems='center' mb={10}>
        <Status status={instanceErr} mr={8} />
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
      
      <p className='expand' onClick={() => {
  
        navigate(`/${instance.name}`) 
      } }>See More...</p>

    </Box>
  )
}
export default InstanceUnit