import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Servers from './Servers/Servers'
import Instance from './Instance/Instance'
import './app.scss'
import { useState } from 'react'

function App() {
  const [selected, setSelected] = useState()
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Servers setSelected={setSelected} />} />
          <Route path='/:name' element={<Instance instance={selected}/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
