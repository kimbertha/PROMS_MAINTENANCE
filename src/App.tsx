import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Server from './Routes/Servers/Server'
import Overview from './Routes/Overview/Overview'
import Instance from './Routes/Instance/Instance'
import './app.scss'
import { Box } from '@chakra-ui/react'

function App() {
  return (
    <>
      <Box className='background-img'/>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Overview/>} />
          <Route path='/:server/:instance' element={<Instance />} />
          <Route path='/:server' element={<Server/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
