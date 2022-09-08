import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Bible from './components/Bible';

const App = () => {
  return (
    <div className="App">
      <Bible width={100} />
    </div>
  );
}

export default App;
