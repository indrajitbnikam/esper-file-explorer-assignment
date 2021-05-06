import React from 'react';
import './App.scss';
import Explorer from './pages/explorer/explorer.page';

function App() {
  return (
    <div className="app-container">
      <h1>File Explorer (List View)</h1>
      <div className='explorer-container'>
        <Explorer />
      </div>
    </div>
  );
}

export default App;
