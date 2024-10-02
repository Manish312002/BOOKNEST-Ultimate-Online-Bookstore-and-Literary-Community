import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import MyFooter from './components/home/Footer'

function App() {
  

  return (
    <>
      <Navbar />
      <div className='min-h-screen'>
        <Outlet />
      </div>
      <MyFooter />
    </>
  )
}

export default App
