import React from 'react'
import './searchBar.scss'
import { Input,Box } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'

interface SearchBarProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}
export const SearchBar = ({ searchValue, setSearchValue }) => {

  const handleChange = (e) => {
    setSearchValue(e.target.value)
  }
  return (
    <Box className='search-bar' display='flex' alignItems='center'>
      <Search2Icon mr={7} ml={4} color='grey'/>
      <Input value={searchValue} onChange={(e) => handleChange(e) }type="text" placeholder="Search..." border="none" outline='none'  className='search-input' />
    </Box>
  )
}
export default SearchBar