
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import NavBar from './components/NavBar/NavBar.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <NavBar/>
      </div>
     
    </>
  )
}

export default App