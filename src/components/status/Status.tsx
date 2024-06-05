import react from 'react'
import './status.scss'
import { Box, Heading } from '@chakra-ui/react'

interface StatusProps { 
  status: boolean;
  icon?: any;
  styles?: object;
  size?: string;
  [x:string]: any;
}

const Status:React.FC<StatusProps> = ({ title, icon, status, size = 'sm', ...other }) => {
  const backgroundColor = !status ? 'red' : '#12b36d'
  
  return (
    
    <Box display='flex' alignItems='center'  {...other}>
      {icon ? <Box color={!status ? 'red' : '#12b36d'} > {icon} </Box> : <Box mr={2} className='status-circle' style={{ backgroundColor }} />}
      <Heading size={size}>{title}</Heading>
    </Box>
    
  )
}

export default Status