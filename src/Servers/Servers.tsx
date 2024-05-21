/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import axios from 'axios'
import { headers, dataObj, dataURL } from '../lib/api'
import ServerUnit from './units/ServerUnit'
import InstanceUnit from './units/InstanceUnit'
import ServerHeader from './ServerHeader'
import NewInstance from './forms/NewInstance'
import { useModal } from '../components/modal/useModal'

const Servers = () => {
  const [serverData, setServerData] = useState<any>([])
  const [serverMode, setServerMode] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [isOpen, setIsOpen, toggleModal] = useModal(false)
  const displayClass = !serverMode ? 'block' : 'flex' 

  const filtered = searchValue !== '' ?
    [...serverData].filter(server =>
      server.instances.some(instance => instance.title.toLowerCase().includes(searchValue.toLowerCase()))
    || server.title.toLowerCase().includes(searchValue.toLowerCase()))
    : serverData
  
  const constructServerData = (dsArray) => {
    const arr = dsArray.map(str => str.split(' ').filter(Boolean)).slice(1)
    return  arr.map(([fileSystem, size, used, avail, use, mountedOn]) => ({ fileSystem, size, used, avail, use, mountedOn }))
  }

  const constructData = async () => {
    const obj = await Promise.all( dataObj.map(async server => ({
      ...server, instances:
        await Promise.all(server.instances.map(async instance => {
          try {
            const req = (await axios.get(dataURL(server.id, instance.id), headers)).data
            return { ...instance, ...req, dsArray: constructServerData(req.dsArray) }
          } catch (err) {
            console.log(err)
            return { ...instance, error: err.message }
          }
          
        }))
    })))
    setServerData(obj)
  }

  useEffect(() => {
    constructData()
    // const timer = setInterval(() => constructData(), 2000)
    // return () => clearInterval(timer)
  }, [])


  return (
    <Box>
      
      <NewInstance
        setIsOpen={setIsOpen}
        isOpen={isOpen} />

      <ServerHeader
        toggleModal={toggleModal}
        setServerMode={setServerMode}
        serverMode={serverMode}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      <Box className='content' display={displayClass} flexGrow={1}>
        {filtered.map(server =><Box key={server.title} display='flex'>
          <ServerUnit server={server} serverMode={serverMode} />

          {!serverMode && <Box overflow='scroll' display='flex'>
            {server.instances.map(instance => 
              <InstanceUnit server={server.id} instance={instance}  key={instance.id}/>
            )}
          </Box>
          }
        </Box>
        )}
      </Box>

    </Box>
  )
}
export default Servers

