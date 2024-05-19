import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import NavBar from './components/navbar';
import ProductTable from './components/producttable';

function App() {
  return (
    <div className="App">
      <NavBar />
      
      <ProductTable />
    </div>
  );
}

export default App;
