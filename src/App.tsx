import React from 'react';
import './App.css';
import Dashboard from 'pages/dashboard';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <main className="app">
      <HashRouter basename='/'>
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Redirect from="/" to="dashboard" exact />
          <Route path="/*" render={() => <div>Broken route</div>} />
        </Switch>
      </HashRouter>
    </main>
  );
}

export default App;
