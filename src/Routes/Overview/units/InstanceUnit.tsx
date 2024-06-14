import React, { useState } from 'react'
import { Box,Text } from '@chakra-ui/react'
import Status from '../../../components/status/Status'
import { useNavigate } from 'react-router-dom'
import { HiOutlineStatusOnline } from 'react-icons/hi'
import { MdOutlineCrisisAlert } from 'react-icons/md'
import { TbMailExclamation } from 'react-icons/tb'

import { getPing } from '../../../lib/hooks'
import { pingURL } from '../../../lib/api'
import { getLastBackup, isolateInstanceBackups, getLastLogin } from '../../../lib/functions'
import moment from 'moment'

interface InstanceUnitProps {
  server: string;
  instance: any;
}

const InstanceUnit = ({ instance, server }: InstanceUnitProps) => {
  const navigate = useNavigate()
  const border = instance.error ? 'rgba(222, 15, 15, 0.8)' : 'rgba(36, 36, 36, 0.9)'
  const { pingStatus } = getPing(server, instance.id)

  

  if (!instance) return null
  const backup = instance.backupArray && getLastBackup(isolateInstanceBackups(instance.backupArray, instance.title)) 
  const lastLogin = instance.auditLogs && getLastLogin(instance.auditLogs)
  const cronTime = instance.cronArray && instance.cronArray.filter(val => val.includes('sudo -u postgres pg_dump -U postgres') && val.includes(instance.id))[0]
  const cronVal = cronTime && cronTime.split(' ')[0].replace('@', '')

  const checkBackupFreq = () => {
    const yesterday = moment().subtract(1, 'days')
    const lastWeek = moment().subtract(7, 'days')
    const lastMonth = moment().subtract(1, 'months')

    if (cronVal === 'weekly') {
      const test = backup.date.isBetween(lastWeek, moment())
      return test
    }
  }

  const details = [{
    title: 'Last Backup',
    field: backup && moment(backup.date).format('Do MMMM YYYY')
    
  },
  {
    title: 'Backup Size',
    field: backup && <span style={{ color: backup.size === '0' ? 'red' : 'auto' }}>{backup.size}</span>
  },
  {
    title: 'Last Login',
    field: lastLogin.username
  },
  {
    title: 'Backup Freq',
    field: cronVal && <span style={{ color: checkBackupFreq() ? 'green' : 'red' }}>{cronVal}</span>
  }]


  checkBackupFreq()
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
          <Box flexGrow={1} overflow='scroll' my='5px'>
            {details.map(d => 
              d.field  &&
              <Box className='xsb' key={d.title}>
                <Text className='bold'>{d.title}</Text>
                <Text>{d.field}</Text>
              </Box>
            )}
            
          </Box>

          <Text className='expand'
            onClick={() => navigate(`${server}/${instance.id}`)}>
            See More...
          </Text>
        </>
      }
    </Box>
  )
}
export default InstanceUnit