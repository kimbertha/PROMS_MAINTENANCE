import React from 'react'
import { Heading, Box } from '@chakra-ui/react'


const LogFiles = ({ instance }) => {

  //values

  const data : Array<string|string[]> = instance?.logFiles.map(log =>
    log.includes('[Thread') ?
      [...log.split('  - ')[0].split(' ').filter(log => log !== ''), ...[log.split('  - ')[1]]]
      : log)

  const colors = ['red', 'green', 'blue', 'pink', 'orange', 'black']
  
  return (
    <>
      <Heading size='md'>Logfiles</Heading>
      <Box className='logs-container'>
        {data?.map((log, i) => <p key={i}>
          {typeof log === 'string' ? log : log.map((title, i) =>
            <span key={i} style={{ color: colors[i] }}>{title + '  '} </span>
          )}
        </p>)}
      </Box>
    </>
  )
}

export default LogFiles