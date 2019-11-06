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
   Grid,
   Link,
   makeStyles,
   Toolbar,
   Typography,
} from '@material-ui/core';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const NavBar: React.FC = () => {
   const dispatch = useDispatch();
   const user = useSelector((state: AppState) => state.userWithToken.loggedUser.user);
   const token = useSelector((state: AppState) => state.userWithToken.loggedUser.token);

   dispatchInsideEffect(
      setUserAndToken(userAndToken() as LoggedUser),
      dispatch,
   );

   const useStyles = makeStyles((theme) => ({
      buttonWithMarginLeft: {
         color: '#fff',
         marginLeft: theme.spacing(1),
      },
      buttonWithMarginRight: {
         color: '#fff',
         marginRight: theme.spacing(1),
      },
      noUnderscore: {
         textDecoration: 'none',
      },
   }));
   const classes = useStyles({});

   return (
      <>
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
                                 component={WithRouterLink}
                                 to={`/users/${user._id}`}
                                 variant="outlined"
                                 size="small"
                                 className={classes.buttonWithMarginLeft}
                              >
                                 {user.name}
                              </Button>
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
