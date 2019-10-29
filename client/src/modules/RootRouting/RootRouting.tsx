import Home from '#/modules/Home/Home';
import Signup from '#/modules/Signup/Signup';
import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

export const RootRouter: React.FC = () => (
   <BrowserRouter>
      <Switch>
         <Route path="/" exact component={Home} />
         <Route path="/signup"  component={Signup} />
         <Route path="*" component={Signup} />
      </Switch>
   </BrowserRouter>
);
