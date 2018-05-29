import React from 'react';

import TodoList from './TodoList'
import Notes from './Notes'
import User from './User'

import logo from './logo.svg';
import './App.css';

const Header = () => (
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h1 className="App-title">Apollo Link State with Mutlipe Stores</h1>
  </header>);

const App = () => (
  <div className="App">
    <Header/>
    <TodoList/>
    <Notes/>
    <User/>
  </div>
);

export default App;
