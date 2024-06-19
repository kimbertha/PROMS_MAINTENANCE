import React from 'react'
import {  Box  } from '@chakra-ui/react'
import { constructObject } from '../../../lib/functions/helpers'
import Terminal from '../../../components/terminal/Terminal'

const LogFiles = ({ logFiles, height = 'auto' }) => {

  const titles = ['date', 'time', 'thread','status', 'location','undefined']
  
  const data = logFiles?.data?.reverse().map(log =>
    log.includes('[Thread') || log.includes('[http') ? constructObject(log, titles) : log)
    
  return (
    <Box>
      <Terminal
        titles={titles}
        arr={data}
        header='LogFiles'
        countValue='status'
        height={height}
        status={true} />
    </Box>
  )
}

export default LogFiles

