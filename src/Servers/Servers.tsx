/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import { Box, Button } from '@chakra-ui/react'
import axios from 'axios'
import { headers, getData } from '../api'
import ServerUnit from './ServerUnit'
import InstanceUnit from './InstanceUnit'
import ServerHeader from './ServerHeader'

const fi = {
  name: 'test3',
  input: '/data/test/',
  history: '/data/test/historical/',
  database: 'echo_test_nov2019'
}

const Servers = () => {
  const [serverData, setServerData] = useState<any>([])
  const [serverErr, setServerErr] = useState<boolean>(false)
  const [serverMode, setServerMode] = useState(false)

  const getServerData = async () => {
    try {
      const res = (await axios.get(getData, headers)).data
      setServerData([res, res, res, res])
    } catch (err) {
      setServerData(true)
    }
  } 
  
  useEffect(() => {
    getServerData()
  }, [])


  const fakeInstances = [fi,fi,fi,fi ]

  return (
    <Box>

      <ServerHeader setServerMode={setServerMode} serverMode={serverMode} />
      <Box className='content'>

        {!serverMode ?
          serverData.map((server: any[], i: React.Key | null | undefined) =>
            <Box key={i} className='server-container' display='flex'>
              <ServerUnit server={server} serverErr={serverErr} />

              <Box className='instances-container' display='flex'>
                {fakeInstances.map((instance, i) =>
                  <InstanceUnit key={i} instance={instance} serverErr={false} />)}
              </Box>
            </Box>
          )
  
          :
          <Box display='flex'>
            {serverData.map((server: any[], i: React.Key | null | undefined) =>
              <ServerUnit server={server} serverErr={serverErr} />)}
          </Box>
        }
        
      </Box>
    </Box>
  )
}
export default Servers