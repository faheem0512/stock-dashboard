import React from 'react';
import './App.css';
import Dashboard from 'pages/dashboard';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <main className="app">
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Redirect from="/" to="dashboard" exact />
          <Route path="/*" render={() => <div>Broken route</div>} />
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
