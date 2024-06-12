import React from 'react'
import { Heading, Box } from '@chakra-ui/react'
import Status from '../components/status/Status'
const LogFiles = ({ instance }) => {

  //values

  const data : Array<string|string[]> = instance?.logFiles.reverse().map(log =>
    log.includes('[Thread') ?
      [...log.split('  - ')[0].split(' ').filter(log => log !== ''), ...[log.split('  - ')[1]]]
      : log)

  const colors = ['rgb(9, 175, 175)', 'rgb(9, 175, 175)', 'rgb(3, 116, 116)', 'rgb(149, 35, 149)','rgb(215, 197, 2)', 'white']
  const counts = {}

  const titles = () => {
    data?.filter(obj => typeof obj !== 'string').map(obj => obj[3]).forEach(function (x) {
      counts[x] = (counts[x] || 0) + 1 
    })
  }
  titles()

  return (
    <Box border='1px solid lightGrey' my={2}>

      <Box display='flex' justifyContent='space-between' alignItems='center' p={4}>
        <Heading size='md'>Logfiles</Heading>
        <Box display='flex'>
          {Object.entries(counts).map((entry: [string, number]) => <Box className='tableCount'>{entry[0]} {entry[1]}</Box>)}
        </Box>
      </Box>

      <Box className='logs-container'>
        {data?.map((log, i) => 
          <Box display='flex' key={i}>
            {typeof log !== 'string' && <Status status={log[3] === 'ERROR' ? false : true} />}
            <p key={i}>
              {typeof log === 'string' ? <span style={{ color: 'white' }}>{log}</span> :
                log.map((title, i) =>
                  <span key={i} style={{ color: colors[i], marginRight: '5px' }}>{title} </span>
                )}
            </p>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default LogFiles