import { Copyright } from '#/modules/Copyright/Copyright';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { TextField } from 'final-form-material-ui';
import * as React from 'react';
import { Field, Form } from 'react-final-form';
import * as C from './constants';
import { validate } from './validate';

const onSubmit = async (values) => {
   const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
   await sleep(300);
   console.log(values);
};

const SignUp: React.FC = () => {
   const classes = C.useStyles({});

   return (
      <Form
         onSubmit={onSubmit}
         validate={validate}
         initialValues={{}}
         render={({ handleSubmit, submitting, pristine }) => (
            <form onSubmit={handleSubmit} noValidate className={classes.form}>
               <Container component="main" maxWidth="xs">
                  <CssBaseline />
                  <div className={classes.paper}>
                     <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                     </Avatar>
                     <Typography component="h1" variant="h5">
                        Sign in
                     </Typography>
                     <Field
                        component={TextField}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                     />
                     <Field
                        component={TextField}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                     />
                     <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                     />
                     <Button
                        disabled={submitting || pristine}
                        type="submit"
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
                           <Link href="#" variant="body2">
                              {'Don\'t have an account? Sign Up'}
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
      />
   );
};

export default SignUp;
