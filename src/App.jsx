import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ArticleList from './components/ArticleList';
import ArticlePage from './components/ArticlePage';

function App() {
  const [count, setCount] = useState(0)

  return (
      <Routes>
        <Route path="/" element={<ArticleList />} />
        {/* <Route path="/" element={<p>Welcome to NC News</p>} /> */}
        <Route path='/articles/:article_id' element={<ArticlePage />}/>
      </Routes>
  )
}

export default App
