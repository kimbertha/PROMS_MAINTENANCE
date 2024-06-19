import React, { useState } from 'react'
import { Box,Text } from '@chakra-ui/react'
import Status from '../status/Status'
import TerminalConatiner from './TerminalContainer'

interface TerminalInputProps {
  arr: any[];
  titles: string[];
  header: string;
  countValue?: string
  height?: string;
  status?: boolean
  showButtons: boolean
}

const TerminalInput = ({ arr, titles, header, countValue, height, status, showButtons = false }: TerminalInputProps) => {
  const [darkMode, setDarkMode] = useState(true)
  const color =  darkMode ? 'white' : 'black'

  const colors = [
    'rgb(9, 175, 175)',
    'rgb(9, 175, 175)',
    'rgb(3, 116, 116)',
    'rgb(149, 35, 149)',
    'rgb(215, 197, 2)',
    color]

  const counts = {}
  if (countValue) {
    arr?.filter(obj => typeof obj !== 'string').map(obj => obj[countValue]).forEach(obj => {
      counts[obj] = (counts[obj] || 0) + 1
    })
  }

  return (
    <TerminalConatiner
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      header={header}
      countValues={countValue && counts}
      height={height}
      showButtons={showButtons}>
      
      {arr?.map((val, i) =>
        <Box display='flex' key={i}>

          {status && typeof val !== 'string' &&
              <Status
                alignItems='start'
                pt='7px'
                status={val.status === 'ERROR' ? false : true} />}
            
          {typeof val === 'string' ?
            <p style={{ color }}>{val}</p> :
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
  )
}

export default TerminalInput