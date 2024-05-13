import { Box, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import logo from '../assets/PROMS-Logo-RGB.png'

interface ServerHeaderProps {
  setServerMode: boolean;
  serverMode: boolean;
}

const ServerHeader = ({ setServerMode, serverMode }) => {
  const [show, setShow] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const menuUnderline = setServerMode ? 'black' : ''


  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) { 
      console.log('called')
      setShow(false) 
    } else { 
      console.log('called2')
      setShow(true)  
    }
    setLastScrollY(window.scrollY) 
  }

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar)

    // cleanup function
    return () => {
      window.removeEventListener('scroll', controlNavbar)
    }
  }, [lastScrollY])
  

  return (
    <Box width='100%'  className={`server-header active ${!show && 'hidden'}`}>

      {/* <Box className='header-title' display='flex' justifyContent='space-between' alignItems='center'> */}
      {/* <h1>PROMS Maitenance Panel</h1> */}
      {/* <Box>
        <Button mr={10}>+ New  Server</Button>
        <Button>+ New Instance</Button>
      </Box> */}
      {/* </Box> */}

      <Box display='flex'>
        <Box className='menu-item' mr={20} onClick={() => setServerMode(true)}>
          <p className='menu-title'
            style={{ borderBottom: serverMode && '2px solid black' }}
          >Servers</p>
        </Box>
        <Box className='menu-item' onClick={() => setServerMode(false)}>
          <p className='menu-title'
            style={{ borderBottom: !serverMode && '2px solid black' }}
          >Instances</p>
        </Box>
      </Box>

      <Box display='flex' alignItems='center' height='100%'>
        <Button mr={10}>+ New  Server</Button>
        <Button>+ New Instance</Button>
      </Box>
        
    </Box>
  )
}

export default ServerHeader