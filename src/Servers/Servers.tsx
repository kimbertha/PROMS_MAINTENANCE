/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import { Box, Button } from '@chakra-ui/react'
import axios from 'axios'
import { headers, getData, dataObj } from '../api'
import ServerUnit from './ServerUnit'
import InstanceUnit from './InstanceUnit'
import ServerHeader from './ServerHeader'

const fi = {
  name: 'test3',
  input: '/data/test/',
  history: '/data/test/historical/',
  database: 'echo_test_nov2019'
}



const Servers = ({ setSelected }) => {
  const [serverData, setServerData] = useState<any>([])
  const [serverMode, setServerMode] = useState(false)
  const [searchValue, setSearchValue] = useState('')



  const constructData = async () => {
    const arr: any = [...dataObj]

    arr.forEach((server, serverIndex) => {
      server.instances.map(async (instance, instanceIndex) => {
        try {
          const info = (await axios.get(instance.url, headers)).data
          arr[serverIndex].instances[instanceIndex] = { ...instance, info }

          if (instanceIndex === server.instances.length - 1) {
            arr[serverIndex] = { ...server, drives: info.dsArray }
          }

        } catch (err) {
          console.log(err)
        }
        
      })
    })
  }


  const constructDataTest = async () => {
    const arr: any = [...dataObj]
    await arr.forEach(async (server, serverIndex) => {
      await server.instances.map(async (instance, instanceIndex) => {
        const { data } = await axios.get(instance.url, headers)
        arr[serverIndex].instances[instanceIndex] = { ...instance, data, testing: 'fdlkgnkdfjgnkjsn'  }
      })
    })
    setServerData(arr)
  }

  console.log(serverData[0]?.instances[0].data)

  useEffect(() => {
    constructDataTest()
  }, [])



  // const filtered = searchValue !== '' ? serverData.filter(server => server.serverTitle.toLowerCase().includes(searchValue.toLowerCase())) : serverData

  return (
    <Box className='container'>
      <Box className='background-img'/>

      <ServerHeader
        setServerMode={setServerMode}
        serverMode={serverMode}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      <Box className='content' display={!serverMode ? 'block' : 'flex'} flexGrow={1}>
        {serverData?.map((server: any, i: number) =>
          <Box key={i} display='flex'>
            {/* <ServerUnit server={server} serverMode={serverMode} /> */}

            {/* {!serverMode &&
              <Box overflow='scroll' display='flex'>
                {server.instances.map((instance, i) => console.log(instance)
                  // <InstanceUnit instance={instance} key={i} setSelected={setSelected} />
                )
                }
              </Box>
            } */}
        
          </Box>
        )}
  
      
      </Box>

    </Box>
  )
}
export default Servers

