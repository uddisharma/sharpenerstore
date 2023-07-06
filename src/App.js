import logo from "./logo.svg";
import "./App.css";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import AllRoutes from "./Routes";

function App() {
  return (
    <div>
      <Navbar />
      <AllRoutes />
    </div>
  );
}

export default App;
