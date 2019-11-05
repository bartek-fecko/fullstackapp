import AppState from '#/config/appState';
import Paper from '@material-ui/core/Paper';
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useParams } from 'react-router';
import ErrorChip from '#/components/ErrorChip/ErrorChip';
import { Form, Field } from 'react-final-form';
import { validate } from '../../SignIn/validate';
import { Container, CssBaseline, Avatar, Typography, Chip, Button, Box } from '@material-ui/core';
import WithRouterLink from '#/components/WithRouterLink/WithRouterLink';
import Copyright from '../../Copyright/Copyright';
import * as C from './constants';
import { IUserProfile } from '../constants';
import { setUserAndToken } from '#/store/JwtStore/actions';
import { LoggedUser } from '#/store/JwtStore/constants';
import { TextField } from 'final-form-material-ui';

interface UserEditProps {
   user: IUserProfile;
}

const UserEdit: React.FC<UserEditProps> = (
   { user: { name, image, email, updated, avatarColor } }
) => {
   const dispatch = useDispatch();
   const classes = C.useStyles({});
   const [serverError, setServerError] = React.useState<string | false>(false);
   const [isSuccessfulEdited, setIsSuccessfulEdited] = React.useState<boolean>(false);

   const onSubmit = async (values: C.UserEditData) => {
      // try {
      //    const response = await fetch(`http://localhost:3000/api/users/${}1`, {
      //       body: JSON.stringify({ ...values }),
      //       headers: {
      //          'Content-type': 'application/json; charset=UTF-8',
      //       },
      //       method: 'POST',
      //    });
      //    const data: C.ServerResponse = await response.json();
      //    if (data.error) {
      //       setServerError(data.error);
      //    } else {
      //       setToken(JSON.stringify(data));
      //       dispatch(setUserAndToken(data as LoggedUser));
      //       setSuccessfulLoggedIn(true);
      //    }
      // } catch (err) {
      //    setServerError(err);
      // }
   };
   const initialValues = {

   };

   return (
      <>
         <Form
            onSubmit={onSubmit}
            validate={validate}
            initialValues={initialValues}
            render={({ handleSubmit, submitting, pristine }) => (
               <form onSubmit={handleSubmit} className={classes.form}>
                  <Container component="main" maxWidth="xs">
                     <CssBaseline />
                     <div className={classes.paper}>
                        <Avatar
                           className={classes.avatar}
                           style={{ backgroundColor: avatarColor }}
                        >
                           {image || name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography component="h1" variant="h5">
                           Edit profile
                        </Typography>
                        {
                           serverError && <Chip label={serverError} color="secondary" />
                        }
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
                           Edit
                        </Button>
                     </div>
                     <Box mt={8}>
                        <Copyright />
                     </Box>
                  </Container>
               </form>
            )}
         />
      </>
   );
};

export default UserEdit;
