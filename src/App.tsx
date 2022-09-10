import React, { useState, useEffect } from 'react';
import Bible from './components/Bible';
import Home from './pages/Home';
import Bar from './components/Bar/Bar';

const App = () => {
  return (
    <div className="App">
      {/* <Bible width={100} /> */}
      <Bar />
      <Home />
    </div>
  );
}

export default App;
