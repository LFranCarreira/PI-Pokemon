import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Landing from './components/LandingPage/Landing.jsx'


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing} />


      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
