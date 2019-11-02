import Logout from '#/components/Logout/Logout';
import WithRouterLink from '#/components/WithRouterLink/WithRouterLink';
import isUserLoggedIn from '#/utils/isUserLoggedIn';
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

const NavBar: React.FC = () => {
   const useStyles = makeStyles((theme) => ({
      signinButton: {
         color: '#fff',
         marginRight: theme.spacing(1),
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
                     <Typography variant="h6" color="inherit" noWrap>
                        FullStackApp
                     </Typography>
                  </Grid>
                  <Grid item>
                     {!isUserLoggedIn()
                        ? (
                           <>
                              <Button
                                 component={WithRouterLink}
                                 to="/signin"
                                 variant="outlined"
                                 size="small"
                                 className={classes.signinButton}
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
                           <Link
                              component={Logout}
                              to="/"
                              color="inherit"
                              variant="body2"
                           >
                              Log out
                           </Link>
                        )}
                  </Grid>
               </Grid>
            </Toolbar>
         </AppBar>
      </>
   );
};

export default NavBar;
