import Home from '#/modules/Home/Home';
import NavBar from '#/modules/NavBar/NavBar';
import SignIn from '#/modules/SignIn/SignIn';
import SignUp from '#/modules/SignUp/SignUp';
import CreatePost from '#/modules/UserPosts/Create/CreatePost';
import UserProfile from '#/modules/UserProfile/UserProfile';
import SinglePost from '#/modules/Posts/SinglePost/SinglePost';
import Users from '#/modules/Users/Users';
import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UsersSkeleton from '../Users/UsersSkeleton';

export const RootRouter: React.FC = () => (
   <BrowserRouter>
      <NavBar />
      <Switch>
         <Route path="/" exact component={Home} />
         <Route path="/signup" component={SignUp} />
         <Route path="/signin" component={SignIn} />
         <Route path="/users" exact component={Users} />
         <Route path="/users/:userId" component={UserProfile} />
         <Route path="/posts/create" exact component={CreatePost} />
         <Route path="/posts/:postId" exact component={SinglePost} />
         <Route path="/skeleton" component={UsersSkeleton} />
         <Route path="*" component={() => <span>404 Not found</span>} />
      </Switch>
   </BrowserRouter>
);
