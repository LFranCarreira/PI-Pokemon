import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import LandingPage from './components/LandingPage/Landing.jsx';
import Home from './components/HomePage/Home';
import Error404 from './components/Error404/Error404';
import Loading from './components/Loading/Loading';
import CreatePokemon from './components/CreatePokemon/CreatePokemon';
import Detail from './components/Detail/Detail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/detail/:id" component={Detail} />
          <Route exact path="/createPokemon" component={CreatePokemon} />
          <Route exact path="/loading" component={Loading} />
          <Route path="*" component={Error404} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
