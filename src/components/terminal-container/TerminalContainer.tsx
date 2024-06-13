import React from 'react'
import { Box } from '@chakra-ui/react'
import { ClipLoader } from 'react-spinners'
import './terminal-container.scss'

interface TerminalConatinerProps {
  loading?: boolean;
  children: React.ReactNode;
  height?: string;
}
const TerminalConatiner = ({ loading, children, height }: TerminalConatinerProps) => {
  
  return (
    <Box className='terminal-container' height={loading ? 'auto' : height ? height : 'auto'}>
      {loading ?

        <Box className='loader-container'>
        
          <ClipLoader
            color='lightGrey'
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </Box>
        :
        children}
    </Box>
  )
}

export default TerminalConatiner