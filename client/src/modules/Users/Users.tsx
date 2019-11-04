import AppState from '#/config/appState';
import { requestUsers } from '#/store/UsersStore/actions';
import { Grid, Paper } from '@material-ui/core';
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
import ErrorChip from '#/components/ErrorChip/ErrorChip';

const Users = () => {
   const dispatch = useDispatch();
   const users = useSelector((state: AppState) => state.users.data);
   const isLoading = useSelector((state: AppState) => state.users.isLoading);
   const error = useSelector((state: AppState) => state.users.error);

   React.useEffect(() => {
      dispatch(requestUsers());
   }, []);

   const useStyles = makeStyles((theme: Theme) =>
      createStyles({
         header: {
            margin: `${theme.spacing(2)}px 0`,
         },
         inline: {
            display: 'inline',
         },
         paper: {
            margin: '0 auto',
            padding: theme.spacing(2, 1),
         },
         root: {
            backgroundColor: theme.palette.background.paper,
            maxWidth: 360,
            width: '100%',
         },
      }),
   );

   const classes = useStyles({});

   return (
      <>
         {error ? <ErrorChip />
            : isLoading ? <div>lodading..</div>
               : <Grid container justify="center">
                  <Grid item>
                     <Typography variant="h5" className={classes.header}>
                        Users
                     </Typography>
                     <Divider variant="inset" component="li" />
                  </Grid>
                  <Grid container justify="center">
                     <Paper className={classes.paper}>
                        <Grid item xs={10} container direction="column" justify="center" alignItems="center"  >
                           {users.map(({ _id, email, name }) => (
                              <List className={classes.root} key={_id}>
                                 <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                       <Avatar alt={name.charAt(0).toUpperCase()} src={null}>
                                          {name.charAt(0).toUpperCase()}
                                       </Avatar>
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
                                 
                              </List>
                           ))}
                        </Grid>
                     </Paper>
                  </Grid>
               </Grid>
         }
      </>
   );
};

export default Users;
