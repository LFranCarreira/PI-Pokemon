import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Landing from './components/LandingPage/Landing.jsx'
import Home from './components/HomePage/Home';
import Error404 from './components/Error404/Error404';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home}/>
        <Route exact path="/detail/:id" component={Landing}/>
        <Route exact path="/createPokemon" component={Landing}/>
        <Route path="*" component={Error404}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
