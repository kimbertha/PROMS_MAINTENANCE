import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel  } from '@chakra-ui/react'

const TabsMenu = ({ tabs, ...others }) => {

  return (
    <Tabs {...others}  variant='enclosed'>
      <TabList>
        {tabs.map((tab,i) => <Tab key={i}>{tab.title}</Tab>)}
      </TabList>
  
      <TabPanels>
        {tabs.map((tab,i)=> <TabPanel key={i}>{tab.element}</TabPanel>)}
      </TabPanels>
    </Tabs>
  )
}
export default TabsMenu