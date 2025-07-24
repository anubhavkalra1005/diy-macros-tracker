import { useState, useEffect } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Home from './components/home/Home';
import MacrosChart from './components/macrosChart/MacrosChart';
import MacrosTracker from './components/macrosTracker/MacrosTracker';
import Header from './components/header/Header';

import { Routes, Route } from 'react-router-dom'

function App() {

  // const [ name, setName ] = useState("");
  // const [ email, setEmail ] = useState("");

  // useEffect(() => {
  //   fetch('http://localhost:5000/api/users')
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data);
  //       data.forEach(user => {
  //         setName(() => user.name);
  //         setEmail(() => user.email);
  //       })
  //     });
  // }, []);

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

      {/* <div>
        <h1>Hello {name}</h1>
        <h3>Your email {email}</h3>
        Welcome to the React App
      </div> */}
    </>

  );
}

export default App
