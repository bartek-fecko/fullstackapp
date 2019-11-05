import Home from '#/modules/Home/Home';
import NavBar from '#/modules/NavBar/NavBar';
import SignIn from '#/modules/SignIn/SignIn';
import SignUp from '#/modules/SignUp/SignUp';
import UserProfile from '#/modules/UserProfile/UserProfile';
import Users from '#/modules/Users/Users';
import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UsersSkeleton from '../Users/UsersSkeleton';

export const RootRouter: React.FC = () => (
   <BrowserRouter>
         <NavBar />
         <Switch>
            <Route path="/" exact component={Users} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <Route path="/users" exact component={Users} />
            <Route path="/users/:userId" component={UserProfile} />
            <Route path="/skeleton" component={UsersSkeleton} />
            <Route path="*" component={Home} />
         </Switch>
   </BrowserRouter>
);
