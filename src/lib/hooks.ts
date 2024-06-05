/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { headers, pingURL } from './api'


export const getPing = (server,instance)=> {
  const [pingStatus, setPingStatus] = useState<boolean>(false)

  const getPingStatus = async () => {
    const res = await axios.get(pingURL(server, instance), headers)
    setPingStatus(res.status === 200 ? true : false)
  }

  useEffect(() => {
    getPingStatus()
  }, [])
  
  return { pingStatus }
}