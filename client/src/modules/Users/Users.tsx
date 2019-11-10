import ErrorChip from '#/components/ErrorChip/ErrorChip';
import WithRouterLink from '#/components/WithRouterLink/WithRouterLink';
import AppState from '#/config/appState';
import { requestUsers } from '#/store/UsersStore/actions';
import { Grid, Link, Paper } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isArray } from 'util';
import * as C from './constants';
import UsersSkeleton from './UsersSkeleton';

const Users = () => {
   const dispatch = useDispatch();
   const users = useSelector((state: AppState) => state.users.data);
   const isLoading = useSelector((state: AppState) => state.users.isLoading);
   const error = useSelector((state: AppState) => state.users.error);

   React.useEffect(() => {
      dispatch(requestUsers());
   }, []);

   const classes = C.useStyles({});

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
                     <Grid
                        item
                        xs={10}
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        wrap="nowrap"
                     >
                        {isArray(users) && users.map(({
                           _id, hasPhoto, name, avatarColor, userDescription,
                        }) => (
                              <Paper className={classes.paper} key={_id}>
                                 <Grid item zeroMinWidth className={classes.userElementRoot}>
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
                                                   src={hasPhoto ? `/api/users/photo/${_id}` : null}
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
                                                         noWrap
                                                      >
                                                         {userDescription || 'I don\t say anything..'}
                                                      </Typography>
                                                   </>
                                                }
                                             />
                                          </ListItem>
                                       </List>
                                    </Link>
                                 </Grid>
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
