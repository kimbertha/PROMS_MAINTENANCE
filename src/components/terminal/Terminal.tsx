import React from 'react'
import { Box,Text } from '@chakra-ui/react'
import Status from '../status/Status'
import TerminalConatiner from './TerminalContainer'

interface TerminalInputProps {
  arr: any[];
  titles: string[];
  header: string;
  countValue?: string
  height?: string;
}

const TerminalInput = ({ arr, titles, header, countValue, height }: TerminalInputProps) => {

  const colors = ['rgb(9, 175, 175)', 'rgb(9, 175, 175)', 'rgb(3, 116, 116)', 'rgb(149, 35, 149)', 'rgb(215, 197, 2)', 'white']

  const counts = {}
  if (countValue) {
    arr?.filter(obj => typeof obj !== 'string').map(obj => obj[countValue]).forEach(obj => {
      counts[obj] = (counts[obj] || 0) + 1
    })
  }

  return (
    <Box>
      <TerminalConatiner header={header} countValues={countValue && counts} height={height}>
        {arr?.map((val, i) =>
          <Box display='flex' key={i}>
            {typeof val !== 'string' &&
              <Status
                alignItems='start'
                pt='7px'
                status={val.status === 'ERROR' ? false : true} />}
            
            {typeof val === 'string' ? val :
              <p>{titles.map((title, i) =>
                <Text
                  key={i}
                  as='span'
                  mr={2}
                  style={{ color: colors[i] || 'white' }} >
                  {val[title]}
                </Text>)}</p>}
          
          </Box>
        
        )}
      </TerminalConatiner>
    </Box>
  )
}

export default TerminalInput