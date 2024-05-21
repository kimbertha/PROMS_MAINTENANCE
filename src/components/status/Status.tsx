import react from 'react'
import './status.scss'
import { Box, Heading } from '@chakra-ui/react'

interface StatusProps { 
  status: boolean;
  styles?: object;
  size?: string;
  [x:string]: any;
}

const Status:React.FC<StatusProps> = ({ title, status, size = 'sm', ...other }) => {
  const backgroundColor = !status ? 'red' : '#12b36d'
  
  return (
    
    <Box display='flex' alignItems='center'>
      <Box mr={2} className='status-circle' style={{ backgroundColor }} {...other} />
      <Heading size={size}>{title}</Heading>
    </Box>
    
  )
}

export default Status