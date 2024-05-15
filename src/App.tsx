import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Servers from './Servers/Servers'
import Instance from './Instance/Instance'
import './app.scss'
import { Box } from '@chakra-ui/react'

function App() {
  return (
    <>
      <Box className='background-img'/>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Servers/>} />
          <Route path='/:server/:instance' element={<Instance/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
