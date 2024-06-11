import React from 'react'
import { Box, Heading } from '@chakra-ui/react'

const Backups = ({ instance }) => {

  if (!instance?.backupArray) return null
  return (
    <>
      <Heading size='md'>Backups</Heading>
      <Box className='backups-container'>
        {instance?.backupArray?.map((cron, i) => <Box key={i}>{cron}</Box>)}
      </Box>
    </>
    
  )
}
export default Backups