import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ArticleList from './components/ArticleList';

function App() {
  const [count, setCount] = useState(0)

  return (
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/" element={<p>Welcome to NC News</p>} />
      </Routes>
  )
}

export default App
