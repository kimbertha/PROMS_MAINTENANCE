import react from 'react'
import './status.scss'
import { Box } from '@chakra-ui/react'

interface StatusProps { 
  status: boolean;
  styles?: object;
  [x:string]: any;
}

const Status:React.FC<StatusProps> = ({ status, ...other }) => {
  const backgroundColor = status ? 'red' : '#12b36d'
  return (
    
    <Box className='status-circle' style={{ backgroundColor }} {...other}>
    </Box>
    
  )
}

export default Status