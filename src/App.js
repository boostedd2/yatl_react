import React from 'react';
import './App.css';
import NavBar from './components/navbar/index';
import TodoList from './components/todolist/index';

function App() {
  return (
    <div className="App">
      <NavBar />
      <TodoList />
    </div>
  );
}

export default App;
