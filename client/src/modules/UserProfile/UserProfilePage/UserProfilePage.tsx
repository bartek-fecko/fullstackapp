import ErrorChip from '#/components/ErrorChip/ErrorChip';
import AppState from '#/config/appState';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router';
import { UserProfileData } from '../constants';
import * as C from './constants';

export interface UserProfilePageProps {
   user: UserProfileData;
   loggedInUserPofile?: boolean;
}

const UserProfilePage: React.FC<UserProfilePageProps> = ({ user, loggedInUserPofile }) => {
   const token = useSelector((state: AppState) => state.userWithToken.loggedUser.token);
   const loggedInUser = useSelector((state: AppState) => state.userWithToken.loggedUser.user);
   const params: { userId?: string } = useParams();
   const [serverError, setServerError] = React.useState<string | boolean>(false);
   const [isLoading, setLoading] = React.useState(false);
   const [isFollowing, setFollowing] = React.useState<any | false>(
      user.followers && user.followers.find((follower) => follower._id === loggedInUser._id),
   );

   const {
      _id,
      name,
      hasPhoto,
      email,
      avatarColor,
      joined,
      userDescription,
   } = user;

   const followFetchOptions = {
      headers: {
         'Accept': 'application/json',
         'Authorization': `Bearer ${token}`,
         'Content-Type': 'application/json',
      },
      method: 'PUT',
   };

   const followHandler = async () => {
      try {
         setLoading(true);
         const response = await fetch(`http://localhost:${process.env.PORT}/api/follow/user/follow`, {
            body: JSON.stringify({
               followId: params.userId,
               userId: loggedInUser._id,
            }),
            ...followFetchOptions,
         });
         const data = await response.json();

         if (data.error) {
            return setServerError(data.error);
         }

         setLoading(false);
         setFollowing(true);
      } catch (err) {
         if (err.message) {
            setServerError(err.message);
         } else {
            setServerError(JSON.stringify(err));
         }
      }
   };

   const unfollowHandler = async () => {
      try {
         setLoading(true);
         const response = await fetch('/api/follow/user/unfollow', {
            body: JSON.stringify({
               unFollowId: params.userId,
               userId: loggedInUser._id,
            }),
            ...followFetchOptions,
         });
         const data = await response.json();

         if (data.error) {
            return setServerError(data.error);
         }

         setLoading(false);
         setFollowing(false);
      } catch (err) {
         if (err.message) {
            setServerError(err.message);
         } else {
            setServerError(JSON.stringify(err));
         }
      }
   };

   const classes = C.useStyles({});

   const avatarSrc = hasPhoto ? `/api/users/photo/${_id}` : null;

   return (
      <>
         {!params.userId && <Redirect to="/" />}
         <div className={classes.root}>
            <Paper className={classes.paper}>
               {serverError && <ErrorChip text={serverError} />}
               <Grid container spacing={2}>
                  <Grid item>
                     <ListItemAvatar>
                        <Avatar
                           style={{ background: avatarColor }}
                           alt={name.charAt(0).toUpperCase()}
                           src={avatarSrc}
                           className={classes.avatarImg}
                        >
                           {name.charAt(0).toUpperCase()}
                        </Avatar>
                     </ListItemAvatar>
                     {!hasPhoto && (
                        <ListItemAvatar >
                           <Avatar style={{ background: avatarColor }} />
                        </ListItemAvatar>
                     )}
                  </Grid>
                  <Grid item xs={12} sm container>
                     <Grid
                        item
                        xs
                        container
                        direction="column"
                        spacing={2}
                        wrap="nowrap"
                        className={classes.userInfo}
                     >
                        <Grid item xs>
                           <Grid
                              container
                              alignItems="flex-start"
                              justify="space-between"
                           >
                              <Grid item>
                                 <Typography gutterBottom variant="h4" noWrap>
                                    {name}
                                 </Typography>
                              </Grid>
                              <Grid item>
                                 <Typography
                                    variant="subtitle1"
                                    color="textSecondary"
                                    className={classes.joinedDate}
                                 >
                                    joined {new Date(joined).toDateString()}
                                 </Typography>
                              </Grid>
                           </Grid>
                           <Typography variant="body2" gutterBottom>
                              {userDescription || 'I don\t say anything'}
                           </Typography>
                           <Typography variant="body2" color="textSecondary">
                              email: {email}
                           </Typography>
                        </Grid>
                        {!loggedInUserPofile && (
                           <Grid item container alignItems="baseline">
                              {!isFollowing
                                 ? (
                                    <Typography variant="body2" className={classes.pointerCursor}>
                                       <Button
                                          variant="outlined"
                                          size="small"
                                          onClick={followHandler}
                                          disabled={isLoading}
                                       >
                                          Follow
                                       </Button>
                                    </Typography>
                                 )
                                 : (
                                    <Typography
                                       variant="body2"
                                       className={classes.pointerCursor}
                                    >
                                       <Button
                                          variant="outlined"
                                          size="small"
                                          onClick={unfollowHandler}
                                          disabled={isLoading}
                                       >
                                          Unfollow
                                       </Button>
                                    </Typography>
                                 )}
                           </Grid>
                        )}
                     </Grid>
                  </Grid>
               </Grid>
            </Paper>
         </div>
      </>
   );
};

export default UserProfilePage;
