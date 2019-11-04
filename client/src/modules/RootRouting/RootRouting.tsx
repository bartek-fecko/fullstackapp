import Home from '#/modules/Home/Home';
import NavBar from '#/modules/NavBar/NavBar';
import SignIn from '#/modules/SignIn/SignIn';
import SignUp from '#/modules/SignUp/SignUp';
import UserProfile from '#/modules/UserProfile/UserProfile';
import Users from '#/modules/Users/Users';
import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Facebook from '../Users/UsersSkeleton';

export const RootRouter: React.FC = () => (
   <BrowserRouter>
         <NavBar />
         <Switch>
            <Route path="/" exact component={UserProfile} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <Route path="/users" component={Users} />
            <Route path="/user/:userId" component={UserProfile} />
            <Route path="/skeleton" component={Facebook} />
            <Route path="*" component={Home} />
         </Switch>
   </BrowserRouter>
);
