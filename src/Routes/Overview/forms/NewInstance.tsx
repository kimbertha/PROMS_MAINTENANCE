import React, { useState } from 'react'
import { Box, Heading,Button } from '@chakra-ui/react'
import Modal from '../../../components/modal/Modal'
import { HiMiniServerStack, HiServer } from 'react-icons/hi2'
import { IoIosAddCircle } from 'react-icons/io'
import FormInput from '../../../components/formInput/FormInput'
import { useForm } from '../../../components/formInput/useForm'

const initForm = {
  serverId: '',
  serverName: '',
  instanceName: '',
  instanceId: ''
}
const NewInstance = ({ isOpen, setIsOpen }) => {
  const [values, handleChange] = useForm(initForm)

  const sections = [{
    title: 'Server',
    icon: <HiMiniServerStack />,
    inputProps: [{
      label: 'Name',
      id: 'serverName'
    },
    {
      label: 'Field',
      id: 'serverId'
    }]
  }, {
    title: 'Instance',
    icon: <HiServer />,
    inputProps: [
      {
        label: 'Name',
        id: 'instanceName'
      },
      {
        label: 'Field',
        id: 'instanceId'
      }]
  }]
  
  const handleSubmit = () => {
    console.log('called')
  }

  return (
    <Box>
      <Modal isOpen={isOpen} setOpen={setIsOpen} width='50vw'>

        <Box display='flex' alignItems='center' pb={5}  borderBottom='2px solid lightGrey'>
          <IoIosAddCircle/>
          <Heading ml={2} size='md'>Add New Instance</Heading>
        </Box>
        
    
        {sections.map(section =>
          <Box key={section.title} my={3}>

            <Box display='flex' alignItems='center'>
              {section.icon}
              <Heading size='sm' ml={2} my={2}>{section.title}</Heading>
            </Box>

            <Box display='flex'>
              {section.inputProps.map((input,i) =>
                <FormInput
                  id={input.id}
                  key={input.label}
                  mr={i === 0 && 3}
                  label={input.label}
                  addonLabel={true}
                  handleChange={handleChange}
                />)}
            </Box>
          </Box>)}
        
        
        <Button size='sm' onClick={handleSubmit} mt={5} mb={2} color='white' background='rgb(26, 144, 247)'>Save</Button>
        <Button size='sm' onClick={()=> setIsOpen(false)}>Cancel</Button>
        

      </Modal>

    </Box>
  )
}

export default NewInstance