import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from './pages/login/Login';
import ContainerPage from './components/container/Container';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <ContainerPage />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
