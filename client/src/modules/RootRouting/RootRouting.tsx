import Home from '#/modules/Home/Home';
import NavBar from '#/modules/NavBar/NavBar';
import SignIn from '#/modules/SignIn/SignIn';
import SignUp from '#/modules/SignUp/SignUp';
import UserProfile from '#/modules/UserProfile/UserProfile';
import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

export const RootRouter: React.FC = () => (
   <BrowserRouter>
         <NavBar />
         <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <Route path="/user/:userId" component={UserProfile} />
            <Route path="*" component={Home} />
         </Switch>
   </BrowserRouter>
);
