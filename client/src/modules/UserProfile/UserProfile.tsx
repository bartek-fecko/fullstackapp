import AppState from '#/config/appState';
import {
   Avatar,
   Button,
   Card,
   Divider,
   Grid,
   Link,
   List,
   ListItem,
   ListItemText,
   Typography,
   ListItemAvatar,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router';

const UserProfile = () => {
   const userLoogedIn = useSelector((state: AppState) => state.userWithToken.loggedUser.user);
   const token = useSelector((state: AppState) => state.userWithToken.loggedUser.token);
   const [profileUser, setProflieUser] = React.useState({});
   const [authoraized, setAuthorized] = React.useState(true);
   const params: { userId?: string } = useParams();

   React.useEffect(() => {
      
   });

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

   const useStyles = makeStyles((theme: Theme) => ({
      card: {
         margin: '0 auto',
      },
      dividerFullWidth: {
         margin: `5px 0 0 ${theme.spacing(2)}px`,
         width: '100%',
      },
      dividerInset: {
         margin: `5px 0 0 ${theme.spacing(9)}px`,
      },
      funcionalityButton: {
         margin: `${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(1)}px 0`,
      },
      removeButton: {
         color: theme.palette.error.main,
      },
      listItem: {
         textAlign: 'center',
         width: 'auto',
      },
      root: {
         alignItems: 'center',
         backgroundColor: theme.palette.background.paper,
         display: 'flex',
         flexDirection: 'column',
         justifyContent: 'center',
      },
      divider: {
         width: '100%',
      },
      withAvatar: {
         transform: 'translateX(-32px)',
      },
   }));

   const classes = useStyles({});

   return (
      <>
         {(!params.userId || !authoraized) && <Redirect to="/" />}
         <Grid container >
            <Grid item xs={12} md={6} className={classes.card}>
               <Card >
                  <List className={classes.root}>
                     <ListItem className={classes.listItem}>
                        <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                     </ListItem>
                     <Divider className={classes.divider} component="li" />
                     <li>
                        <Typography
                           className={classes.dividerFullWidth}
                           color="textSecondary"
                           display="block"
                           variant="caption"
                        />
                     </li>
                     <ListItem className={classes.listItem}>
                        <ListItemText primary="Work" secondary="Jan 7, 2014" />
                     </ListItem>
                     <Divider className={classes.divider} component="li" />
                     <li>
                        <Typography
                           className={classes.dividerInset}
                           color="textSecondary"
                           display="block"
                           variant="caption"
                        />
                     </li>
                     <ListItem className={`${classes.listItem} ${classes.withAvatar}`}>
                        <ListItemAvatar>
                           <Avatar>
                              <BeachAccessIcon />
                           </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Vacation" secondary="July 20, 2014" />
                     </ListItem>
                  </List>
                  {/* {userLoogedIn._id === profileUser._id && ( */}
                  <Grid
                     container
                     direction="row"
                     justify="flex-end"
                     alignItems="center"
                  >
                     <Button
                        variant="outlined"
                        size="small"
                        className={classes.funcionalityButton}
                     >
                        Edit
               </Button>
                     <Link
                        className={`${classes.funcionalityButton} ${classes.removeButton}`}
                     >
                        Remove
               </Link>
                  </Grid>
                  {/* )} */}
               </Card>
            </Grid>
         </Grid>
      </>
   );
};

export default UserProfile;
