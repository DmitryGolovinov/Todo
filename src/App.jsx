import React from 'react';
import './App.scss';
import TextArea from './components/textarea.component.jsx'

function App() {
  return (
    <div>
      <header>
      <h1>Todo list</h1>
      <h4>What would you like to do today?</h4>
      </header>
      <TextArea />
    </div>
  );
}

export default App;
