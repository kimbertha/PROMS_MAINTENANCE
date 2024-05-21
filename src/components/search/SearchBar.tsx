import React from 'react'
import './searchBar.scss'
import { Search2Icon } from '@chakra-ui/icons'
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon
} from '@chakra-ui/react'

interface SearchBarProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}
export const SearchBar = ({ searchValue, setSearchValue }:SearchBarProps) => {

  const handleChange = (e) => {
    setSearchValue(e.target.value)
  }
  return (

    <InputGroup borderRadius={5} size="xs" className='search-bar'>
      <InputLeftElement
        pointerEvents="none"
        children={<Search2Icon color="gray.600" />}
      />
      <Input className='search-input' value={searchValue} onChange={(e) => handleChange(e) } type="text" placeholder="Search..."  />
    
    
      {/*
      <InputRightAddon
        p={0}
        border="none"
      >
      </InputRightAddon> */}
    </InputGroup>
  
  )
}
export default SearchBar