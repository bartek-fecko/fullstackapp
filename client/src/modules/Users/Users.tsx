import ErrorChip from '#/components/ErrorChip/ErrorChip';
import WithRouterLink from '#/components/WithRouterLink/WithRouterLink';
import AppState from '#/config/appState';
import { requestUsers } from '#/store/UsersStore/actions';
import { Grid, Link, Paper } from '@material-ui/core';
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
import UsersSkeleton from './UsersSkeleton';

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
            margin: `${theme.spacing(1)}px 0`,
         },
         secendaryText: {
            display: 'inline',
            marginTop: '20px',
         },
         paper: {
            margin: `${theme.spacing(1) / 2}px auto`,
            padding: theme.spacing(1, 1),
            position: 'relative',
         },
         root: {
            '&:hover': {
               background: '#eee',
               cursor: 'pointer',
            },
            "backgroundColor": theme.palette.background.paper,
            "width": '100%',
            maxWidth: '380px',
         },
         link: {
            '&:hover': {
               textDecoration: 'none',
            },
         },
         listItem: {
            width: '100%',
         },
      }),
   );

   const classes = useStyles({});

   return (
      <>
         {error ? <ErrorChip />
            : isLoading ? <UsersSkeleton />
               : <Grid container justify="center">
                  <Grid item>
                     <Typography variant="h5" className={classes.header}>
                        Users
                     </Typography>
                  </Grid>
                  <Grid container justify="center">
                     <Grid item xs={10} container direction="column" justify="center" alignItems="center"  >
                        {users.map(({ _id, email, name, avatarColor }) => (
                           <Paper className={classes.paper} key={_id}>
                              <Link
                                 component={WithRouterLink}
                                 to={`/users/${_id}`}
                                 color="inherit"
                                 variant="body2"
                                 className={classes.link}
                              >
                                 <List className={classes.root} key={_id}>
                                    <ListItem alignItems="flex-start" className={classes.listItem}>
                                       <ListItemAvatar>
                                          <Avatar
                                             style={{ background: avatarColor }}
                                             alt={name.charAt(0).toUpperCase()}
                                             src={null}
                                          >
                                             {name.charAt(0).toUpperCase()}
                                          </Avatar>
                                       </ListItemAvatar>
                                       <ListItemText
                                          primary={name}
                                          secondary={
                                             <>
                                                <Typography
                                                   component="span"
                                                   variant="body2"
                                                   className={classes.secendaryText}
                                                   color="textSecondary"
                                                >
                                                   {'I\'ll be in your neighborhood doing errands this…'}
                                                </Typography>
                                             </>
                                          }
                                       />
                                    </ListItem>
                                 </List>
                              </Link>
                           </Paper>
                        ))}
                     </Grid>
                  </Grid>
               </Grid>
         }
      </>
   );
};

export default Users;
