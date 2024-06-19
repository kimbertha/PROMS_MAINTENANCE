import React from 'react'
import { Box, Heading } from '@chakra-ui/react'
import { ClipLoader } from 'react-spinners'
import './terminal.scss'

interface TerminalConatinerProps {
  loading?: boolean;
  children: React.ReactNode;
  height?: string;
  countValues?: any;
  header: string;
}
const TerminalConatiner = ({ loading, children, height, countValues, header }: TerminalConatinerProps) => {

  return (
    <Box border='1px solid lightGrey'>
      <Box display='flex' justifyContent='space-between' alignItems='center' p={4}>
        <Heading size='md'>{header}</Heading>

        {countValues && <Box display='flex'>
          {Object.entries(countValues).map((entry: [string, number]) =>
            <Box key={entry[0]}
              className='tableCount'>
              {entry[0]} {entry[1]}
            </Box>)}
        </Box>}
      </Box>
          

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
    </Box>
  )
}

export default TerminalConatiner