import Navbar from '../components/Navbar.jsx'
import Header from '../components/Header.jsx'
import { Outlet } from 'react-router'

function LayoutPublic() {
  return (
    <>
        <div className='bg-primary'>
            <Navbar/>
            <Outlet/>
            
        </div>
    </>
  )
}

export default LayoutPublic