/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import logo from '../assets/PROMS-Logo-RGB.png'

interface ServerHeaderProps {
  setServerMode: React.Dispatch<React.SetStateAction<boolean>>;
  serverMode: boolean;
}

const ServerHeader = ({ setServerMode, serverMode }:ServerHeaderProps) => {
  const [show, setShow] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const controlNavbar = () => {
    window.scrollY > lastScrollY ? setShow(false) : setShow(true)  
    setLastScrollY(window.scrollY) 
  }

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar)
    return () => {
      window.removeEventListener('scroll', controlNavbar)
    }
  }, [lastScrollY])
  

  return (
    <Box width='100%' className={`server-header ${!show && 'hidden'}`}>

      <Box display='flex'>
        <Box className='menu-item' mr={20} onClick={() => setServerMode(true)}>
          <p style={{ borderBottom: serverMode && '2px solid black' }}
          >Servers</p>
        </Box>
        <Box className='menu-item' onClick={() => setServerMode(false)}>
          <p  style={{ borderBottom: !serverMode && '2px solid black' }}
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
