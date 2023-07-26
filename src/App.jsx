import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Header from "./components/Header";

const App = () => {
  return (
    <BrowserRouter>
      <div className="bg-black relative z-0 bg-primary">
        <div className="bg-her-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Header />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
