import useFileInput from '#/components/FileInput/useFileInput';
import Copyright from '#/modules/Copyright/Copyright';
import { Box, Button, Chip, Container, CssBaseline, Typography } from '@material-ui/core';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import { TextField } from 'final-form-material-ui';
import * as React from 'react';
import { Field, Form } from 'react-final-form';
import useLocalStorage from 'react-use-localstorage';
import * as C from './constants';
import { validate } from './validate';

const CreatePost: React.FC = () => {
   const [loggedInUserAndtoken] = useLocalStorage('jwt-token');
   const userAndToken = JSON.parse(loggedInUserAndtoken);
   const [successfullyCreated, setSuccessfullyCreated] = React.useState(false);
   const [serverError, setServerError] = React.useState<string | boolean>(false);
   const [ImageFileInput, imageFile] = useFileInput({ backgroundColor: 'rgba(0,0,0,0) !important' });

   const onSubmit = async (values: C.PostCreateData) => {
      try {
         const editedData = new FormData();
         for (const key of Object.keys(values)) {
            editedData.append(key, values[key]);
         }

         if (imageFile) {
            editedData.append('photo', imageFile);
            editedData.append('hasPhoto', 'true');
         }

         const response = await fetch(`/api/posts/create/${userAndToken.user._id}`, {
            body: editedData,
            headers: {
               Accept: 'application/json',
               Authorization: `Bearer ${userAndToken.token}`,
            },
            method: 'POST',
         });

         const data: C.ServerResponse = await response.json();
         if (data.error) {
            setServerError(data.error);
         } else {
            setSuccessfullyCreated(true);
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

   return (
      <>
         <Form
            onSubmit={onSubmit}
            validate={validate}
            render={({ handleSubmit, submitting, pristine }) => (
               <form onSubmit={handleSubmit} className={classes.form}>
                  <Container component="main" maxWidth="xs">
                     <CssBaseline />
                     <div className={classes.paper}>
                        <Typography component="h1" variant="h5">
                           Create Post
                        </Typography>
                        {
                           serverError && <Chip label={serverError} color="secondary" />
                        }
                        {
                           successfullyCreated && <Chip label={C.PostCreateMessages.PostCreatedSuccessfully} color="primary" />
                        }
                        <Field
                           component={TextField}
                           autoFocus
                           variant="outlined"
                           margin="normal"
                           fullWidth
                           name="title"
                           label="Post title"
                        />
                        <Field
                           component={TextField}
                           variant="outlined"
                           margin="normal"
                           fullWidth
                           label="Post main text"
                           name="body"
                           autoComplete="name"
                        />
                        <div className={classes.imageWrapper}>
                           <ImageFileInput
                              id="userProfileEditImageFile"
                              accept="image/*"
                           >
                              <ImageOutlinedIcon fontSize="large" color="secondary" />
                           </ImageFileInput>
                           <Typography variant="subtitle1" gutterBottom>
                              {imageFile ? imageFile.name : 'Post image'}
                           </Typography>
                        </div>
                        <Button
                           type="submit"
                           disabled={submitting || pristine}
                           fullWidth
                           variant="contained"
                           color="primary"
                           className={classes.submit}
                        >
                           Create Post
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

export default CreatePost;
