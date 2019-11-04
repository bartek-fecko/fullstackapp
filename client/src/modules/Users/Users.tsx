import AppState from '#/config/appState';
import { requestUsers } from '#/store/UsersStore/actions';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import { Redirect } from 'react-router';

const Users = () => {
   const dispatch = useDispatch();
   const users = useSelector((state: AppState) => state.users.data);
   const isLoading = useSelector((state: AppState) => state.users.isLoading);
   const error = useSelector((state: AppState) => state.users.error);

   React.useEffect(() => {
      dispatch(requestUsers());
   }, []);

   // const getUser = async () => {
   //    try {
   //       const response = await fetch(`http://localhost:3000/api/users/${params.userId}`, {
   //          headers: {
   //             'Authorization': `Bearer ${token}`,
   //             'Content-type': 'application/json; charset=UTF-8',
   //          },
   //       });
   //       const data = await response.json();
   //       console.log(data)
   //       setProflieUser(data);
   //    } catch (err) {
   //       if (err) {
   //          console.log(err)
   //          setAuthorized(false);
   //       }
   //    }
   // };

   const useStyles = makeStyles((theme: Theme) =>
      createStyles({
         root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
         },
         inline: {
            display: 'inline',
         },
      }),
   );

   const classes = useStyles({});

   return (
      <>
         {error ? 'Oh no something went wrong'
            : isLoading ? <div>lodading..</div>
               : <Grid container alignItems="center">
                  <Grid item xs={10}>
                     {users.map(({ _id, email, name }) => (
                        <List className={classes.root} key={Math.random()}>
                           <ListItem alignItems="flex-start">
                              <ListItemAvatar>
                                 <Avatar alt={name.charAt(0).toUpperCase()} src={null} />
                              </ListItemAvatar>
                              <ListItemText
                                 primary="Brunch this weekend?"
                                 secondary={
                                    <React.Fragment>
                                       <Typography
                                          component="span"
                                          variant="body2"
                                          className={classes.inline}
                                          color="textPrimary"
                                       >
                                          {name}
                                       </Typography>
                                       {' — I\'ll be in your neighborhood doing errands this…'}
                                    </React.Fragment>
                                 }
                              />
                           </ListItem>
                           <Divider variant="inset" component="li" />
                        </List>
                     ))}
                  </Grid>
               </Grid>
         }
      </>
   );
};

export default Users;
