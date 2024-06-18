import React from 'react'
import { Heading, Box , Text } from '@chakra-ui/react'
import Status from '../../components/status/Status'
import TerminalConatiner from '../../components/terminal-container/TerminalContainer'
import { constructObjectSingle } from '../../lib/functions/helpers'


const LogFiles = ({ logFiles }) => {
  

  // const data : Array<string|string[]> = logFiles?.data?.reverse().map(log =>
  //   log.includes('[Thread') || log.includes('[http') ?
  //     [...log.split('  - ')[0].split(' ').filter(log => log !== ''), ...[log.split('  - ')[1]]]
  //     : log)

  const titles = ['date', 'time', 'thread','status', 'location','undefined']
  const colors = ['rgb(9, 175, 175)', 'rgb(9, 175, 175)', 'rgb(3, 116, 116)', 'rgb(149, 35, 149)', 'rgb(215, 197, 2)', 'white']
  
  const data = logFiles?.data?.reverse().map(log =>
    log.includes('[Thread') || log.includes('[http') ? constructObjectSingle(log, titles) : log)
    
  console.log(data)

  const counts = {}

  const titleCount = () => {
    data?.filter(obj => typeof obj !== 'string').map(obj => obj.status).forEach(function (x) {
      counts[x] = (counts[x] || 0) + 1 
    })
  }
  titleCount()

  return (
    <Box border='1px solid lightGrey' my={2}>

      <Box display='flex' justifyContent='space-between' alignItems='center' p={4}>
        <Heading size='md'>Logfiles</Heading>
        <Box display='flex'>
          {/* {Object.entries(counts).map((entry: [string, number]) => <Box key={entry[0]} className='tableCount'>{entry[0]} {entry[1]}</Box>)} */}
        </Box>
      </Box>

      <TerminalConatiner height='60vh' loading={logFiles.loading}>
        {/* {data?.map((log, i) => 
          <Box display='flex' key={i}>
            {typeof log !== 'string' && <Status status={log[3] === 'ERROR' ? false : true} />}
            <p key={i}>
              {typeof log === 'string' ? <span style={{ color: 'white' }}>{log}</span> :
                log.map((title, i) =>
                  <span key={i} style={{ color: colors[i], marginRight: '5px' }}>{title} </span>
                )}
            </p>
          </Box>
        )} */}
        {data?.map(val =>
          typeof val === 'string' ? val :
            <p>{titles.map((title, i) => <Text as='span' mr={2} style={{ color: colors[i] || 'white' }} >{val[title]}</Text>)}</p>
        )}
      </TerminalConatiner>
    </Box>

  )
}

export default LogFiles