import Home from '#/modules/Home/Home';
import SignIn from '#/modules/SignIn/SignIn';
import SignUp from '#/modules/SignUp/SignUp';
import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

export const RootRouter: React.FC = () => (
   <BrowserRouter>
      <NavBar />
      <Switch>
         <Route path="/" exact component={Home} />
         <Route path="/signup" component={SignUp} />
         <Route path="/signin" component={SignIn} />
         <Route path="*" component={Home} />
      </Switch>
   </BrowserRouter>
);
