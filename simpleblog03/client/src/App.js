import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import List from './components/List'
import Upload from './components/Upload'
import Heading from './components/Heading'

const App = () => {
  const [contentList, setContentList] = useState([]);
  return (
    <>
      <Heading />
      <Routes>
        <Route path="/list" element={<List />} contentList={contentList} setContentList={setContentList} />
        <Route path="/upload" element={<Upload />} contentList={contentList} setContentList={setContentList} />
      </Routes>
    </>
  )
}

export default App