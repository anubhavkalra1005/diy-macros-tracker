import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Home from './components/home/Home';
import MacrosChart from './components/macrosChart/MacrosChart';
import MacrosTracker from './components/macrosTracker/MacrosTracker';
import Header from './components/header/Header';

import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <div className="header-component">
        <Header></Header>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/macros-chart" element={<MacrosChart />} />
        <Route path="/macros-tracker" element={<MacrosTracker />} />
      </Routes>
    </>

  );
}

export default App
