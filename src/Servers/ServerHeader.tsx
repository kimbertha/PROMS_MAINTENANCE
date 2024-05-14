/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import logo from '../assets/PROMS-Logo-RGB.png'
import SearchBar from '../components/search/SearchBar'

interface ServerHeaderProps {
  setServerMode: React.Dispatch<React.SetStateAction<boolean>>;
  serverMode: boolean;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const ServerHeader = ({ setServerMode, serverMode, searchValue, setSearchValue }:ServerHeaderProps) => {
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
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
        <Button className='header-button' mx={15}>+ New  Server</Button>
        <Button className='header-button'>+ New Instance</Button>
      </Box>
        
    </Box>
  )
}

export default ServerHeader
