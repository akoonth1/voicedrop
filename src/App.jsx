import { useState, useEffect } from 'react'
import './App.css'
import Recorder from './components/Recorder'
import Profile from './components/Profile'
import Questions from './components/Questions'
import Nav from './components/Nav'
import LandingPage from './Pages/LandingPage'

export default function App() {
  const [path, setPath] = useState(() => window.location.pathname || '/')

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const renderRoute = () => {
    switch (path) {
      case '/':
      case '/landing':
        return <LandingPage />
      case '/profile':
        return <Profile />
      case '/recorder':
        return <Recorder />
      default:
        return <Questions />
    }
  }

  return (
    <>
      <Nav />
      <main style={{ padding: 16, paddingTop: 72 }}>
        {renderRoute()}
      </main>
    </>
  )
}
