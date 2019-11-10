import ErrorChip from '#/components/ErrorChip/ErrorChip';
import AppState from '#/config/appState';
import { setUserAndToken } from '#/store/JwtStore/actions';
import { LoggedUser } from '#/store/JwtStore/constants';
import dispatchInsideEffect from '#/utils/dispatchInsideEffect';
import userAndToken from '#/utils/userAndToken';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router';
import * as C from './constants';
import UserDelete from './Delete/UserDelete';
import UserEdit from './Edit/UserEdit';
import TabPanel from './TabPanel';
import UserProfilePage from './UserProfilePage/UserProfilePage';

const UserProfile = () => {
   const userLoogedIn = useSelector((state: AppState) => state.userWithToken.loggedUser.user);
   const token = useSelector((state: AppState) => state.userWithToken.loggedUser.token);
   const dispatch = useDispatch();
   const [userProfile, setUserProfile] = React.useState<{ _id: string } | C.UserProfileData>({ _id: null });
   const [authoraized, setAuthorized] = React.useState(true);
   const [serverError, setServerError] = React.useState<string | boolean>(false);
   const params: { userId?: string } = useParams();
   const [tab, setTab] = React.useState(0);

   const handleTabsChange = (event: React.ChangeEvent<{}>, newValue: number) => {
      setTab(newValue);
   };

   React.useEffect(() => {
      getUser();
   }, []);

   dispatchInsideEffect(
      setUserAndToken(userAndToken() as LoggedUser),
      dispatch,
   );

   const getUser = async () => {
      try {
         const response = await fetch(`/api/users/${params.userId}`, {
            headers: {
               Accept: 'application/json',
               Authorization: `Bearer ${token}`,
            },
         });
         const data = await response.json();

         if (data.error) {
            return setServerError(data.error);
         }
         setUserProfile(data);
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
         {(!params.userId || !authoraized) && <Redirect to="/" />}
         {serverError
            ? <ErrorChip text={serverError} />
            : (userLoogedIn && userLoogedIn._id === userProfile._id)
               ? (
                  <Paper className={classes.root}>
                     <Tabs
                        value={tab}
                        onChange={handleTabsChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                     >
                        <Tab label="Edit" icon={<EditOutlinedIcon />} />
                        <Tab label="Profile" icon={<PersonOutlineOutlinedIcon />} />
                        <Tab label="Delete" icon={<DeleteOutlineOutlinedIcon />} />
                     </Tabs>
                     <TabPanel value={tab} index={0}>
                        {(userProfile as C.UserProfileData).name && (
                           <UserEdit user={userProfile as C.UserProfileData} />
                        )}
                     </TabPanel>
                     <TabPanel value={tab} index={1}>
                        <UserProfilePage user={userProfile as C.UserProfileData} loggedInUserPofile />
                     </TabPanel>
                     <TabPanel value={tab} index={2}>
                        <UserDelete />
                     </TabPanel>
                  </Paper>
               )
               : (userProfile as C.UserProfileData).name && <UserProfilePage user={userProfile as C.UserProfileData} />
         }
      </>
   );
};

export default UserProfile;
