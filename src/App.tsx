import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Servers from './Servers/Servers'
import Instance from './Instance/Instance'
import './app.scss'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Servers />} />
          <Route path='/:name' element={<Instance />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
