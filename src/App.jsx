import { BrowserRouter } from "react-router-dom"
import Navbar from "./components/Navbar"

const App = ( ) => {

  return (
    <BrowserRouter>
    <div className="bg-black w-full h-screen">
    <Navbar/>
    
    </div>
    </BrowserRouter>
  )
}

export default App