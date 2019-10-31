import Copyright from '#/modules/Copyright/Copyright';
import TextFieldWithAsyncLoader from '#/utils/TextFieldWithAsyncLoader';
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
import * as C from './constants';
import { checkEmailExists, validate } from './validate';

const onSubmit = async (values: C.UserReqisterData) => {
   try {
      const response = await fetch('http://localhost:3000/api/users/signup', {
         body: JSON.stringify({ ...values }),
         headers: {
            'Content-type': 'application/json; charset=UTF-8',
         },
         method: 'POST',
      });
      const data = await response.json();
      console.log(data);
   } catch (e) {
      // tslint:disable-next-line: no-console
      console.error(e);
   }

};

const SignUp: React.FC = () => {
   const classes = C.useStyles({});

   return (
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
                        Sign in
                     </Typography>
                     <Field
                        component={TextField}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Your name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                     />
                     <Field
                        component={TextFieldWithAsyncLoader}
                        validate={checkEmailExists}
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
                     {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                     /> */}
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
