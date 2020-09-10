import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import 'antd/dist/antd.css';

/*    Components    */
import Login from './components/login/Login';
import Home from './components/app/Landing';
import { store } from './redux/store';
import './App.css';


const App = () =>
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path='/home' component={Home} />
        <Route path='/' component={Login} />
      </Switch>
    </Router>
  </Provider>;


export default App;
