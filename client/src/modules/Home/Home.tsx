import WithRouterLink from '#/components/WithRouterLink/WithRouterLink';
import AppState from '#/config/appState';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { useSelector } from 'react-redux';
import AllPosts from '../Posts/AllPosts/AllPosts';
import * as C from './constants';

const Home: React.FC = () => {
   const user = useSelector((state: AppState) => state.userWithToken.loggedUser.user);

   const classes = C.useStyles({});

   return (
      <>
         <main>
            <div className={classes.heroContent}>
               <Container maxWidth="sm">
                  <Typography component="h4" variant="h2" align="center" color="textPrimary" gutterBottom>
                     Posts
                  </Typography>
                  <Typography align="center" color="textSecondary" paragraph>
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto adipisci distinctio voluptates
                     cupiditate quae? Quidem nesciunt sequi laborum sapiente numquam.
                  </Typography>
                  <div className={classes.heroButtons}>
                     <Grid container spacing={2} justify="center">
                        <Grid item>
                           <Button
                              component={WithRouterLink}
                              to="/posts/create"
                              variant="contained"
                              color="primary"
                           >
                              Create your own post
                           </Button>
                        </Grid>
                        <Grid item>
                           <Button
                              variant="outlined"
                              color="primary"
                              component={WithRouterLink}
                              to={`/users/${user._id}`}
                           >
                              Check your profile
                           </Button>
                        </Grid>
                     </Grid>
                  </div>
               </Container>
            </div>
            <Container className={classes.cardGrid} maxWidth="md">
               <AllPosts />
            </Container>
         </main>
      </>
   );
};

export default Home;
