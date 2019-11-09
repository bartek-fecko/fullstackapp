import ErrorChip from '#/components/ErrorChip/ErrorChip';
import AppState from '#/config/appState';
import Avatar from '@material-ui/core/Avatar';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router'
import { UserProfileData } from '../constants';
import * as C from './constants';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
export interface UserProfilePageProps {
   user: UserProfileData;
}

const UserProfilePage: React.FC<UserProfilePageProps> = ({ user }) => {
   const { _id, name, hasPhoto, email, avatarColor, updated, joined, userDescription } = user;
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
                     <Grid item>
                        <Typography variant="body2" style={{ cursor: 'pointer' }}>
                           Follow
                         </Typography>
                     </Grid>
                  </Grid>
               </Grid>
            </Grid>
         </Paper>
      </div>
   );
};

export default UserProfilePage;
