import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Header from './components/layout/Header.jsx'
import Main from './components/layout/Main.jsx'
import Footer from './components/layout/Footer.jsx'

import Write from './components/post/Write'
import Modify from './components/post/Modify'
import List from './components/post/List'
import Detail from './components/post/Detail'
import Home from './pages/Home'
import Login from './components/user/Login.jsx'
import Join from './components/user/Join.jsx'
import Logout from './components/user/Logout.jsx'

const App = () => {
  return (
    <>
      <Header />
      <Main>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/write' element={<Write />}></Route>
          <Route path='/list' element={<List />}></Route>
          <Route path='/detail/:postNum' element={<Detail />}></Route>
          <Route path='/modify/:postNum' element={<Modify />}></Route>
          <Route path='/login/' element={<Login />}></Route>
          <Route path='/logout/' element={<Logout />}></Route>
          <Route path='/join/' element={<Join />}></Route>
        </Routes>
      </Main>
      <Footer />
    </>
  )
}

export default App