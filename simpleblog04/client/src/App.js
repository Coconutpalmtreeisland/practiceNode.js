import React from 'react'
import Heading from './components/Heading'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import List from './components/List'
import Upload from './components/Upload'

const App = () => {
  return (
    <div>
      <Heading />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/list' element={<List />} />
        <Route path='/upload' element={<Upload />} />
      </Routes>
    </div>
  )
}

export default App