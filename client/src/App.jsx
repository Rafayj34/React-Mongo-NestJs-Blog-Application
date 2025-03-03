import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router'
import HomePage from './pages/Homepage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import CreateBlogPage from './pages/CreateBlogPage'
import ErrorPage from './pages/ErrorPage'
import Header from './components/Header'
import BlogPage from './pages/BlogPage'
import { MainContextProvider } from './context/mainContext'
const App = () => {
  return (
    <Router>
      <MainContextProvider>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create-blog" element={<CreateBlogPage />} />
        <Route path="/blog/:slug" element={<BlogPage />} />
        <Route path="*" element={<ErrorPage />} />
        
      </Routes>
      </MainContextProvider>
    </Router>
  )
}

export default App