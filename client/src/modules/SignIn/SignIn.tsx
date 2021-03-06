import WithRouterLink from '#/components/WithRouterLink/WithRouterLink';
import Copyright from '#/modules/Copyright/Copyright';
import * as SignUpConstants from '#/modules/SignUp/constants';
import { setUserAndToken } from '#/store/JwtStore/actions';
import { LoggedUser } from '#/store/JwtStore/constants';
import { Chip } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { TextField } from 'final-form-material-ui';
import * as React from 'react';
import { Field, Form } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import * as C from './constants';
import { validate } from './validate';

const SignIn: React.FC = () => {
   const dispatch = useDispatch();
   const classes = SignUpConstants.useStyles({});
   const [serverError, setServerError] = React.useState<string | false>(false);
   const [isSuccessfulLoggedIn, setSuccessfulLoggedIn] = React.useState<boolean>(false);
   const [token, setToken] = useLocalStorage('jwt-token', '');

   const onSubmit = async (values: C.UserLoginData) => {
      try {
         const response = await fetch(`/api/users/signin`, {
            body: JSON.stringify({ ...values }),
            headers: {
               'Content-type': 'application/json; charset=UTF-8',
            },
            method: 'POST',
         });
         const data: C.ServerResponse = await response.json();
         if (data.error) {
            setServerError(data.error);
         } else {
            setToken(JSON.stringify(data));
            dispatch(setUserAndToken(data as LoggedUser));
            setSuccessfulLoggedIn(true);
         }
      } catch (err) {
         setServerError(err);
      }
   };

   return (
      <>
         {isSuccessfulLoggedIn
            ? <Redirect to="/" />
            : (
               <Form
                  onSubmit={onSubmit}
                  validate={validate}
                  render={({ handleSubmit, submitting, pristine }) => (
                     <form onSubmit={handleSubmit} className={classes.form}>
                        <Container component="main" maxWidth="xs">
                           <CssBaseline />
                           <div className={classes.paper}>
                              <Avatar className={classes.avatar}>
                                 <LockOutlinedIcon />
                              </Avatar>
                              <Typography component="h1" variant="h5">
                                 Sign In
                              </Typography>
                              {
                                 serverError && <Chip label={serverError} color="secondary" />
                              }
                              <Field
                                 component={TextField}
                                 variant="outlined"
                                 margin="normal"
                                 fullWidth
                                 name="email"
                                 label="Email"
                                 type="email"
                                 autoComplete="email"
                              />
                              <Field
                                 component={TextField}
                                 variant="outlined"
                                 margin="normal"
                                 fullWidth
                                 name="password"
                                 label="Password"
                                 type="password"
                                 autoComplete="current-password"
                              />
                              <Button
                                 type="submit"
                                 disabled={submitting || pristine}
                                 fullWidth
                                 variant="contained"
                                 color="primary"
                                 className={classes.submit}
                              >
                                 Sign In
                              </Button>
                              <Grid container>
                                 <Grid item xs>
                                    <Link href="#" variant="body2">
                                       Forgot password?
                                    </Link>
                                 </Grid>
                                 <Grid item>
                                    <Link
                                       component={WithRouterLink}
                                       to="/signup"
                                       color="inherit"
                                       variant="body2"
                                    >
                                       Don't have an account? Sign Up
                                    </Link>
                                 </Grid>
                              </Grid>
                           </div>
                           <Box mt={8}>
                              <Copyright />
                           </Box>
                        </Container>
                     </form>
                  )}
               />)}
      </>
   );
};

export default SignIn;
