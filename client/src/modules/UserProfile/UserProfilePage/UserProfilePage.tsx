import ErrorChip from '#/components/ErrorChip/ErrorChip';
import AppState from '#/config/appState';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import * as C from './constants';
import { Grid } from '@material-ui/core';


const UserProfilePage = () => {
   // const userLoogedIn = useSelector((state: AppState) => state.userWithToken.loggedUser.user);
   // const token = useSelector((state: AppState) => state.userWithToken.loggedUser.token);
   // const [userProfile, setUserProfile] = React.useState<{ _id: string } | C.UserProfileData>({ _id: null });
   // const [authoraized, setAuthorized] = React.useState(true);
   // const [serverError, setServerError] = React.useState<string | boolean>(false);
   // const params: { userId?: string } = useParams();
   // const [value, setValue] = React.useState(0);

   // const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
   //    setValue(newValue);
   // };

   const classes = C.useStyles({});

   return (
      <div className={classes.root}>
         <Grid container>
            <Grid item xs={6}>
               <Paper >
                  
               </Paper>
            </Grid>
         </Grid>
      </div>
   );
};

export default UserProfilePage;
