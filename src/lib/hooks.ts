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


export const apiCaller = ( url)  => {
  const [data, setData] = useState<any>()
  const [error, setError] = useState()
  const [loading,setLoading] = useState<boolean>()

  const getData = async () => {
    try {
      setLoading(true)
      console.log('FIRED')
      setData((await axios.get(url, headers)).data)
      setLoading(false)
    } catch (err) {
      setError(err)
    }
  }
  useEffect(() => {
    getData()
  }, [])
  
  return { data, error, loading }
}