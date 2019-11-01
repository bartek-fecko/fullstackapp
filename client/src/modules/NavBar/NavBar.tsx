import withRouterLink from '#/utils/withRouterLink';
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
                     <Button
                        component={withRouterLink}
                        to="/signin"
                        variant="outlined"
                        size="small"
                        className={classes.signinButton}
                     >
                        Sign in
                     </Button>
                     <Link
                        component={withRouterLink}
                        to="/signup"
                        color="inherit"
                        variant="body2"
                     >
                        Sign up
                     </Link>
                  </Grid>
               </Grid>
            </Toolbar>
         </AppBar>
      </>
   );
};

export default NavBar;
