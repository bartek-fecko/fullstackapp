import Home from '#/modules/Home/Home';
import Signup from '#/modules/Signup/Signup';
import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

export const RootRouter: React.FC = () => (
   <BrowserRouter>
      <NavBar />
      <Switch>
         <Route path="/" exact component={Home} />
         <Route path="/signup" component={Signup} />
         <Route path="*" component={Signup} />
      </Switch>
   </BrowserRouter>
);
