import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel  } from '@chakra-ui/react'

const TabsMenu = ({ tabs, ...others }) => {
  return (
    <Tabs {...others}  variant='enclosed'>
      <TabList>
        {tabs.map(tab => <Tab key={tab.title}>{tab.title}</Tab>)}
      </TabList>
  
      <TabPanels>
        {tabs.map(tab => <TabPanel key={tab.title}>{tab.element}</TabPanel>)}
      </TabPanels>
    </Tabs>
  )
}
export default TabsMenu