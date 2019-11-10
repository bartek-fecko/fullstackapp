import useFileInput from '#/components/FileInput/useFileInput';
import AppState from '#/config/appState';
import Copyright from '#/modules/Copyright/Copyright';
import { updateUserOrToken } from '#/store/JwtStore/actions';
import { LoggedUser } from '#/store/JwtStore/constants';
import { Avatar, Box, Button, Chip, Container, CssBaseline, Typography } from '@material-ui/core';
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';
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
   const { _id, name, hasPhoto, avatarColor, updated } = user;
   const params: { userId?: string } = useParams();
   const [_, setToken] = useLocalStorage('jwt-token', '');
   const dispatch = useDispatch();
   const token = useSelector((state: AppState) => state.userWithToken.loggedUser.token);
   const [successfulUpdated, setSuccessfulUpdated] = React.useState(false);
   const [serverError, setServerError] = React.useState<string | boolean>(false);
   const [ImageFileInput, imageFile] = useFileInput({
      backgroundColor: 'rgba(255,255,255, 0.4) !important',
      bottom: 0,
      left: 0,
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: '8px 0',
      position: 'absolute',
      right: 0,
   });

   const onSubmit = async (values: UserProfileData) => {
      try {
         const editedData = new FormData();
         for (const key of Object.keys(values)) {
            editedData.append(key, values[key]);
         }

         if (imageFile) {
            editedData.append('photo', imageFile);
         }

         const response = await fetch(`/api/users/${params.userId}`, {
            body: editedData,
            headers: {
               Accept: 'application/json',
               Authorization: `Bearer ${token}`,
            },
            method: 'PUT',
         });

         const data: C.ServerResponse = await response.json();
         if (data.error) {
            setServerError(data.error);
         } else {
            setToken(JSON.stringify({ user: data, token }));
            setSuccessfulUpdated(true);
            dispatch(updateUserOrToken({ user: data } as unknown as LoggedUser));
         }
      } catch (err) {
         if (err.message) {
            setServerError(err.message);
         } else {
            setServerError(JSON.stringify(err));
         }
      }
   };

   const classes = C.useStyles({});

   const imageSrc = imageFile
      ? URL.createObjectURL(imageFile)
      : hasPhoto
         ? `/api/users/photo/${_id}`
         : null;

   const { following, followers, ...restUserFields } = user;

   return (
      <>
         <Form
            onSubmit={onSubmit}
            validate={validate}
            initialValues={restUserFields}
            render={({ handleSubmit, submitting, pristine }) => (
               <form onSubmit={handleSubmit} className={classes.form}>
                  <Container component="main" maxWidth="xs">
                     <CssBaseline />
                     <div className={classes.paper}>
                        <div className={classes.imageWrapper}>
                           <Avatar
                              className={classes.avatar}
                              src={imageSrc}
                              style={{ backgroundColor: avatarColor }}
                              alt="user image"
                           >
                              {name.charAt(0).toUpperCase()}
                           </Avatar>
                           <ImageFileInput
                              id="userProfileEditImageFile"
                              accept="image/*"
                           >
                              <AddAPhotoOutlinedIcon className={classes.photoIcon} />
                           </ImageFileInput>
                        </div>

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
                        <Typography
                           variant="caption"
                           display="block"
                           gutterBottom
                           className={classes.updatedDateText}
                        >
                           {updated ? `updated ${new Date(updated).toDateString()}.` : 'no updates yet.'}
                        </Typography>
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
