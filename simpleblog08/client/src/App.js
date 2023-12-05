import React from 'react'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Upload from './components/Upload'
import List from './components/List'
import Detail from './components/Detail'
import Edit from './components/Edit'

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/upload' element={<Upload />}></Route>
        <Route path='/list' element={<List />}></Route>
        <Route path='/post/:postNum' element={<Detail />}></Route>
        <Route path='/edit/:postNum' element={<Edit />}></Route>
      </Routes>
    </div>
  )
}

export default App