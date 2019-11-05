import AppState from '#/config/appState';
import Copyright from '#/modules/Copyright/Copyright';
import { updateUserOrToken } from '#/store/JwtStore/actions';
import { LoggedUser } from '#/store/JwtStore/constants';
import { Avatar, Box, Button, Chip, Container, CssBaseline, Typography } from '@material-ui/core';
import { TextField } from 'final-form-material-ui';
import * as React from 'react';
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import useLocalStorage from 'react-use-localstorage';
import { UserProfileData } from '../constants';
import * as C from './constants';
import { validate } from './validate';

interface UserEditProps {
   user: UserProfileData;
}

const UserEdit: React.FC<UserEditProps> = ({ user }) => {
   const { name, image, avatarColor } = user;
   const params: { userId?: string } = useParams();
   const [_, setToken] = useLocalStorage('jwt-token', '');
   const dispatch = useDispatch();
   const token = useSelector((state: AppState) => state.userWithToken.loggedUser.token);
   const [successfulUpdated, setSuccessfulUpdated] = React.useState(false);
   const [serverError, setServerError] = React.useState<string | boolean>(false);

   const onSubmit = async (values: UserProfileData) => {
      try {
         const response = await fetch(`http://localhost:3000/api/users/${params.userId}`, {
            body: JSON.stringify({ ...values }),
            headers: {
               'Authorization': `Bearer ${token}`,
               'Content-type': 'application/json; charset=UTF-8',
            },
            method: 'PUT',
         });
         const data: C.ServerResponse = await response.json();
         if (data.error) {
            setServerError(data.error);
         } else {
            setToken(JSON.stringify({ user: data.updatedUser, token }));
            setSuccessfulUpdated(true);
            dispatch(updateUserOrToken({ user: data.updatedUser } as unknown as LoggedUser));
         }
      } catch (err) {
         setServerError(err);
      }
   };

   const classes = C.useStyles({});

   return (
      <>
         <Form
            onSubmit={onSubmit}
            validate={validate}
            initialValues={user}
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
                        {
                           successfulUpdated && <Chip label={C.SuccessfulResponse.UserUpdated} color="primary" />
                        }
                        <Field
                           component={TextField}
                           variant="outlined"
                           margin="normal"
                           fullWidth
                           name="userDescription"
                           label="Your description"
                        />
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
                           disabled
                           component={TextField}
                           variant="outlined"
                           margin="normal"
                           fullWidth
                           name="email"
                           label="Email"
                           type="email"
                           autoComplete="email"
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
