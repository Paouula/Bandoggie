import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from '../src/components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Navegation from './components/Navegation';

function App() {
  return (
    <Router>
      <NavBar />
      <Navegation />
      <Footer />
    </Router>
  );
}

export default App;
