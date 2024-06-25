import { Box, Text } from '@chakra-ui/react'
import { IoMdArrowBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'


const BackButton = () => {
  const navigate = useNavigate()

  return (
    <Box display='flex' alignItems='center' onClick={() => navigate(-1)} cursor='pointer'>
      <IoMdArrowBack color='grey'/>
      <Text as='small' color='grey' mx={1}>Go Back</Text>
    </Box>
  )
}

export default BackButton