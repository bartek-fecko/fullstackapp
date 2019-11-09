import ErrorChip from '#/components/ErrorChip/ErrorChip';
import AppState from '#/config/appState';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router'
import { UserProfileData } from '../constants';
import * as C from './constants';

export interface UserProfilePageProps {
   user: UserProfileData;
   loggedInUserPofile?: boolean;
}

const UserProfilePage: React.FC<UserProfilePageProps> = ({ user, loggedInUserPofile }) => {
   const token = useSelector((state: AppState) => state.userWithToken.loggedUser.token);
   const [isFollowing, setFollowing] = React.useState(
      user.followers && user.followers.find((follower) => follower._id === user._id),
   );

   const {
      _id,
      name,
      hasPhoto,
      email,
      avatarColor,
      updated,
      joined,
      userDescription,
      followers,
   } = user;

   const classes = C.useStyles({});

   const avatarSrc = hasPhoto ? `/api/users/photo/${_id}` : null;

   return (
      <div className={classes.root}>
         <Paper className={classes.paper}>
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
                  <ListItemAvatar>
                     {!hasPhoto && <Avatar style={{ background: avatarColor }} />}
                  </ListItemAvatar>
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
                     {!loggedInUserPofile && !isFollowing && (
                        <Grid item container alignItems="baseline">
                           <Typography variant="body2" className={classes.pointerCursor}>
                              <Button
                                 variant="outlined"
                                 size="small"
                              >
                                 Follow
                           </Button>
                           </Typography>
                           {isFollowing && (
                              <Typography
                                 variant="body2"
                                 className={`${classes.unfollowButton} ${classes.pointerCursor}`}
                              >
                                 unfollow
                           </Typography>
                           )}
                        </Grid>
                     )}
                  </Grid>
               </Grid>
            </Grid>
         </Paper>
      </div>
   );
};

export default UserProfilePage;
