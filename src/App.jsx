import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Pagina from "./pages/Pagina";
import IdleRedirect from './components/IdleRedirect';

/*function App() {
  return (
    <div className="container">
        <Book />
    </div>
  );
}*/

function App() {
  return (
    <Router>
      <IdleRedirect>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/pagina1" element={<Pagina num={1} />} />
        <Route path="/pagina2" element={<Pagina num={2} />} />
        <Route path="/pagina3" element={<Pagina num={3} />} />
        <Route path="/pagina4" element={<Pagina num={4} />} />
      </Routes>
      </IdleRedirect>
    </Router>
  );
}

export default App;
