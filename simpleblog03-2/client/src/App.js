import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import Heading from './compeonents/Heading'
import List from './compeonents/List'
import Upload from './compeonents/Upload'

const App = () => {
  const [contentList, setContentList] = useState([]);

  return (
    <>
      <Heading />
      <Routes>
        <Route path="/list" element={<List contentList={contentList} setContentList={setContentList} />}></Route>
        <Route path="/upload" element={<Upload contentList={contentList} setContentList={setContentList} />}></Route>
      </Routes>
    </>
  )
}

export default App