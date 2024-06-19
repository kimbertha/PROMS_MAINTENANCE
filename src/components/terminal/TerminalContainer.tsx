import React, { useState } from 'react'
import { Box, Heading, Button } from '@chakra-ui/react'
import { ClipLoader } from 'react-spinners'
import { MdLightMode, MdDarkMode } from 'react-icons/md'
import { TiCancel } from 'react-icons/ti'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'
import { PiMouseScroll } from 'react-icons/pi'
import { IoMdSearch } from 'react-icons/io'

import './terminal.scss'

interface TerminalConatinerProps {
  loading?: boolean;
  children: React.ReactNode;
  height?: string;
  countValues?: any;
  header: string;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  showButtons:boolean
}
const TerminalConatiner = ({ loading, children, height, countValues, header, darkMode, setDarkMode, showButtons }: TerminalConatinerProps) => {
  const [scroll, setScroll] = useState(true)
  const [fullHeight, setFullHeight] = useState(false)

  const heightC = loading ? 'auto' : height && !fullHeight ? height : 'auto'
  const overflow = scroll ? 'scroll' : 'hidden'
  const backgroundColor = darkMode ? '#070119e6' : 'white'

  const buttons = [{
    icon: <IoMdSearch/>,
    func: () => null
  },{
    icon: scroll ? <TiCancel /> : <PiMouseScroll/>,
    func: () => setScroll(!scroll)
  },{
    icon: darkMode ? <MdLightMode/> : <MdDarkMode/>,
    func: () => setDarkMode(!darkMode)
  }, {
    icon: fullHeight ? <FaAngleUp/> : <FaAngleDown /> ,
    func: () => setFullHeight(!fullHeight)
  }]
  
  return (
    <Box className='full-container'>

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
          
      <Box className='terminal-container'
        backgroundColor={backgroundColor}
        overflow={overflow}
        height={heightC}>
        
        {loading ?
          <Box className='loader-container'>
            <ClipLoader
              color='lightGrey'
              size={100}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </Box>
          : children}
      </Box>

      {showButtons && <Box display='flex' justifyContent='end'>
        {buttons.map(({ func, icon }, i) =>
          <Button key={i} className='button' onClick={func} size='sx'> {icon}</Button>)}
      </Box>}
    </Box>
  )
}

export default TerminalConatiner