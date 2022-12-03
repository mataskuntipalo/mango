import React from 'react';
import { Route } from 'react-router-dom';
import './styles/App.css';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';

function App(): JSX.Element {
  return (
    <>
      <div>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/home" component={Home} />
      </div>
    </>
  );
}

export default App;
