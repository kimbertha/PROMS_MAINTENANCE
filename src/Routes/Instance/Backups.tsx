import React from 'react'
import { Box, Heading,Text } from '@chakra-ui/react'
import { constructObject } from '../../lib/functions/helpers'
import { dataObj } from '../../lib/api'
import { isolateBackups } from '../../lib/functions/functions'


const Backups = ({ backups, instance, server }) => {

  if (!backups) return null

  const titles = ['title', 'unit', 'db1', 'db2', 'size', 'month', 'day', 'time', 'name']
  const colors = ['rgb(9, 175, 175)','rgb(3, 116, 116)', 'rgb(149, 35, 149)', 'rgb(149, 35, 149)','rgb(215, 197, 2)', 'white']

  const backupId = dataObj.filter(obj => obj.id === server)[0].instances.filter(inst => inst.id === instance)[0].backupId
  const isolate = isolateBackups(backups, backupId)

  const objs = constructObject(isolate, titles )
  return (
    <>
      <Heading size='md'>Backups</Heading>
      <Box className='backups-container'>
  
        <Box>
          {objs.map(obj =>
            <p key={obj.name}>{titles.map((title,i) =>
              <Text as='span' mr={2} style={{ color: colors[i] || 'white' }} key={title}>{obj[title]}</Text>)}
            </p>)}
            
        </Box>

      </Box>
    </>
    
  )
}
export default Backups