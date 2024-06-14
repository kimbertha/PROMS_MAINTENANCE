import React, { useState } from 'react'
import { Box,Text } from '@chakra-ui/react'
import Status from '../../../components/status/Status'
import { useNavigate } from 'react-router-dom'
import { BellIcon } from '@chakra-ui/icons'
import { HiOutlineStatusOnline } from 'react-icons/hi'
import { MdOutlineCrisisAlert } from 'react-icons/md'
import { TbMailExclamation } from 'react-icons/tb'

import { getPing } from '../../../lib/hooks'
import { pingURL } from '../../../lib/api'
import { getLastBackup, isolateInstanceBackups } from '../../../lib/functions'
import moment from 'moment'
import Backups from '../../Instance/Backups'


interface InstanceUnitProps {
  server: string;
  instance: any;
}

const InstanceUnit = ({ instance, server }: InstanceUnitProps) => {
  const navigate = useNavigate()
  const border = instance.error ? 'rgba(222, 15, 15, 0.8)' : 'rgba(36, 36, 36, 0.9)'
  const { pingStatus } = getPing(server, instance.id)
  // const backups = getBackupValues(instance?.backupArray)
  // console.log(backups)

  // console.log(instance.backupArray)
  
  const backup = instance.backupArray && getLastBackup(isolateInstanceBackups(instance.backupArray, instance.title)) 
  
  const details = [{
    title: 'Last Backup',
    field: backup && moment(backup.date).format('Do MMMM YYYY')
  }
  ,
  {
    title: 'Backup Size',
    field: backup && backup.size
  }
  // {
  //   title: 'Last Login',
  //   field: backup && backup.size
  // }
  ]

  console.log(instance)
  
  return (
    <Box className='instance-container' style={{ borderTop: `20px solid ${border}` }}>

      <Box className='xsb' mb={1}>
    
        <Status status={!instance.error} title={instance.title} />
        <Box display='flex' alignItems='center'>
          <a href={pingURL(server, instance.id)}>
            {pingStatus ? 
              <HiOutlineStatusOnline color='green' />
              :  <MdOutlineCrisisAlert color='red'/>
            }
          </a>
          
          {instance.error && <TbMailExclamation className='alert-icon' />}
        </Box>
      </Box>
      


      {instance.error ? <Text>{instance.error}</Text> :
        <>
          <Box flexGrow={1} overflow='scroll'>
            {details.map(d => 
              d.field &&
              <Box className='xsb' key={d.field}>
                <Text className='bold'>{d.title}</Text>
                <Text>{d.field}</Text>
                {/* <Text>{instance[d.field]}</Text> */}
              </Box>
            )}
            
          </Box>
          <Text className='expand' onClick={() => navigate(`${server}/${instance.id}`)}>See More...</Text>
        </>
      }
    </Box>
  )
}
export default InstanceUnit