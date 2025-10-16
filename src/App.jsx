import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Recorder from './components/Recorder'
import Profile from './components/Profile'
import Questions from './components/Questions'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Questions></Questions>
    <Recorder></Recorder>
      <div>
       </div> 
    </>
  )
}

export default App
