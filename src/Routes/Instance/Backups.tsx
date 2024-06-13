import React from 'react'
import { Box, Heading } from '@chakra-ui/react'

const Backups = ({ backups, instance }) => {

  if (!backups) return null

  const first = backups.indexOf(instance.toUpperCase())
  const last = backups.slice(first).findIndex((value,i) => i !== 0 && !value.includes('root root'))
  const backUpValues = backups.slice(first + 1, last)

  console.log(backups.map(backup=> backup.replace(/\s+/g, ' ').split(' ')))
  

  return (
    <>
      <Heading size='md'>Backups</Heading>
      <Box className='backups-container'>
        {backUpValues.map((backup, i) => {
          const arr = backup.replace(/\s+/g, ' ').split(' ')
          return (
            <Box key={i}>
              <p>{arr.map((value, i) => i === 4 ? <span style={{ color: 'red' }}>{value}</span> : <span>{value}</span>)}</p>
            </Box>
          )
        
        }
        )}
      </Box>
    </>
    
  )
}
export default Backups