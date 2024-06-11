import React from 'react'
import { Box, Heading } from '@chakra-ui/react'
const Cron = ({ instance }) => {

  if (!instance?.cronArray) return null
  return (
    <>
      <Heading size='md'>Cron</Heading>
      <Box className='cron-container'>
        {instance.cronArray?.map((cron, i) => <Box key={i}>{cron}</Box>)}
      </Box>
    </>
  )
}

export default Cron