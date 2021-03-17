import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';
import App from './App';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
  <Switch>
    <Route path="/" exact={true} component={App} />
    {/* <Route path="/details" exact={true} component={CountryDetails} /> */}
  </Switch>
  </BrowserRouter>
    ,
  document.getElementById('root')
);