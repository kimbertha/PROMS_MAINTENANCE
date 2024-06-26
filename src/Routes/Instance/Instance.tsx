import React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Heading, Text } from '@chakra-ui/react'
import { dataURL, logFilesURL, dataObj } from '../../lib/api'
import { cap } from '../../lib/functions/helpers'
import { apiCaller } from '../../lib/hooks'
import TabsMenu from '../../components/page-menu/TabsMenu'
import Backups from './sections/Backups'
import AuditLogs from './sections/AuditLogs'
import Summary from './Summary'
import LogFiles from './sections/LogFiles'
import Status from '../../components/status/Status'
import { TbMailExclamation } from 'react-icons/tb'


import './instance.scss'
import BackButton from '../../components/BackButton/BackButton'

const Instance = () => {
  const { server: serverURL, instance: instanceURL } = useParams()

  const i = dataObj.findIndex(obj => obj.id === serverURL)
  const instance = dataObj[i].instances.filter(inst => inst.id === instanceURL)[0]

  const server = apiCaller(dataURL(serverURL,  instance.api ? instanceURL : dataObj[i].main )).data
  const logFiles = apiCaller(logFilesURL(serverURL, instanceURL))

  
  const tabElements = [
    {
      title: 'Summary',
      element: <Summary instance={instance} logFiles={logFiles} server={server} />
    },
    {
      title: 'Audit Logs',
      element: <AuditLogs auditLogs={server?.auditLogs} />
    } ,
    {
      title: 'Backups',
      element: <Backups backups={server?.backupArray} instance={instance} />
    },
    {
      title: 'Log Files',
      element: <LogFiles logFiles={logFiles} />
    }]
  

  return (
    <Box className='container'>
      <BackButton/>
      <Box display='flex' justifyContent='space-between' alignItems='center' pt={5} pb={10}>

        <Box>
          <Status status={server} title={`${cap(serverURL)} ${cap(instanceURL)}`} size='lg'/>
          <small>PROMS maintenance panel</small>
        </Box>
        {/* <TbMailExclamation size='1.5em' /> */}
      </Box>

      <TabsMenu
        tabs={instance.api ? tabElements : tabElements.filter((x, i) => i !== 1)}
      />
    </Box>
  )
}
export default Instance