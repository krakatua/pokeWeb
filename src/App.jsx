import {Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Pokedex from "./Pokedex";

const App = () => {
  const location = useLocation();
  const currentPath = location.pathname;


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route index element={<Home/>}/>
        <Route path="pokedex" element={<Pokedex/>}/>
      </Routes>
    </Router>
  );
};

export default App;
