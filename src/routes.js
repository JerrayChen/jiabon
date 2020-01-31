import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Components/Login/Login'
import Register from './Components/Register/Register';
import Dashboard from './Components/Dashboard/Dashboard';
export default (
    <Switch>
        <Route path='/dashboard' component={Dashboard}></Route>
        <Route path='/register' component={Register}></Route>
        <Route path='/' exact component={Login}></Route>
    </Switch>
)