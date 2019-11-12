import Logout from '#/components/Logout/Logout';
import WithRouterLink from '#/components/WithRouterLink/WithRouterLink';
import AppState from '#/config/appState';
import { setUserAndToken } from '#/store/JwtStore/actions';
import { LoggedUser } from '#/store/JwtStore/constants';
import dispatchInsideEffect from '#/utils/dispatchInsideEffect';
import userAndToken from '#/utils/userAndToken';
import {
   AppBar,
   Button,
   CssBaseline,
   Drawer,
   Grid,
   Link,
   List,
   ListItem,
   ListItemIcon,
   Toolbar,
   Typography,
} from '@material-ui/core';
import ChromeReaderModeOutlinedIcon from '@material-ui/icons/ChromeReaderModeOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import * as C from './constants';

const NavBar: React.FC = () => {
   const [menu, setMenu] = React.useState(false);
   const dispatch = useDispatch();
   const user = useSelector((state: AppState) => state.userWithToken.loggedUser.user);
   const token = useSelector((state: AppState) => state.userWithToken.loggedUser.token);

   dispatchInsideEffect(
      setUserAndToken(userAndToken() as LoggedUser),
      dispatch,
   );

   const toggleDrawer = (e: React.KeyboardEvent | React.MouseEvent) => {
      if (
         e &&
         e.type === 'keydown' &&
         ((e as React.KeyboardEvent).key === 'Tab' ||
            (e as React.KeyboardEvent).key === 'Shift')
      ) {
         return;
      }
      setMenu(!menu);
   };

   const sideListItems: Array<{ to: string, IconComponent: React.ComponentType, text: string }> = user && [
      { to: `/users/${user._id}`, text: 'profile', IconComponent: PersonOutlineOutlinedIcon },
      { to: '/', text: 'all posts', IconComponent: ChromeReaderModeOutlinedIcon },
      { to: '/users', text: 'users', IconComponent: GroupOutlinedIcon },
      { to: '/posts/create', text: 'create post', IconComponent: CreateOutlinedIcon },
   ];

   const sideList = () => (
      <div
         className={classes.list}
         role="presentation"
         onClick={toggleDrawer}
         onKeyDown={toggleDrawer}
      >
         <List>
            {sideListItems.map(({ to, IconComponent, text }, i) => (
               // @ts-ignore: component props error
               <Link
                  component={WithRouterLink}
                  to={to}
                  size="small"
                  className={classes.sideNavigationButton}
                  key={i}
               >
                  <ListItem button>
                     <ListItemIcon>
                        <IconComponent />
                     </ListItemIcon>
                     {text}
                  </ListItem>
               </Link>
            ))}
         </List>
      </div>
   );

   const classes = C.useStyles({});

   return (
      <>
         {!user && <Redirect to="/" />}
         <CssBaseline />
         <AppBar position="relative">
            <Toolbar>
               <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
               >
                  <Grid item>
                     <Typography
                        component={WithRouterLink}
                        variant="h6"
                        color="inherit"
                        noWrap
                        className={classes.noUnderscore}
                     >
                        FullStackApp
                     </Typography>
                  </Grid>
                  <Grid item>
                     {!token
                        ? (
                           <>
                              <Button
                                 component={WithRouterLink}
                                 to="/signin"
                                 variant="outlined"
                                 size="small"
                                 className={classes.buttonWithMarginRight}
                              >
                                 Sign in
                              </Button>
                              <Link
                                 component={WithRouterLink}
                                 to="/signup"
                                 color="inherit"
                                 variant="body2"
                              >
                                 Sign up
                              </Link>
                           </>
                        )
                        : (
                           <>
                              <Link
                                 component={Logout}
                                 to="/"
                                 color="inherit"
                                 variant="body2"
                              >
                                 Log out
                              </Link>
                              <Button
                                 className={classes.sideListMenuOpenButton}
                                 onClick={toggleDrawer}
                              >
                                 {user.name}
                              </Button>
                              <Drawer anchor="right" open={menu} onClose={toggleDrawer}>
                                 {sideList()}
                              </Drawer>
                           </>
                        )}
                  </Grid>
               </Grid>
            </Toolbar>
         </AppBar>
      </>
   );
};

export default NavBar;
