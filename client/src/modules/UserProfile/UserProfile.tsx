import ErrorChip from '#/components/ErrorChip/ErrorChip';
import AppState from '#/config/appState';
import Paper from '@material-ui/core/Paper';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router';
import * as C from './constants';
import UserEdit from './Edit/UserEdit';
import TabPanel from './TabPanel';

const UserProfile = () => {
   const userLoogedIn = useSelector((state: AppState) => state.userWithToken.loggedUser.user);
   const token = useSelector((state: AppState) => state.userWithToken.loggedUser.token);
   const [userProfile, setUserProfile] = React.useState<{ _id: string } | C.IUserProfile>({ _id: null });
   const [authoraized, setAuthorized] = React.useState(true);
   const [serverError, setServerError] = React.useState<string | boolean>(false);
   const params: { userId?: string } = useParams();
   const [value, setValue] = React.useState(0);

   const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
      setValue(newValue);
   };

   React.useEffect(() => {
      getUser();
   }, []);

   const getUser = async () => {
      try {
         const response = await fetch(`http://localhost:3000/api/users/${params.userId}`, {
            headers: {
               'Authorization': `Bearer ${token}`,
               'Content-type': 'application/json; charset=UTF-8',
            },
         });
         const data = await response.json();

         if (data.error) {
            return setServerError(data.error);
         }

         setUserProfile(data);
      } catch (err) {
         if (err) {
            return setServerError(err);
         }
      }
   };

   const classes = C.useStyles({});

   return (
      <>
         {(!params.userId || !authoraized) && <Redirect to="/" />}
         {serverError
            ? <ErrorChip text={serverError} />
            : <Paper className={classes.root}>
               <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
               >
                  <Tab label="Edit" {...C.a11yProps(0)} icon={<EditOutlinedIcon />} />
                  <Tab label="Item Two" {...C.a11yProps(1)} icon={<PersonOutlineOutlinedIcon />} />
                  <Tab label="Item Three"{...C.a11yProps(2)} />
               </Tabs>
               <TabPanel value={value} index={0}>
                  {(userProfile as C.IUserProfile).name && <UserEdit user={userProfile as C.IUserProfile} />}
               </TabPanel>
               <TabPanel value={value} index={1}>
                  <div>{JSON.stringify(userProfile)}</div>
                  Item Two
                  </TabPanel>
               <TabPanel value={value} index={2}>
                  Item Three
               </TabPanel>
            </Paper>}
      </>
   );
};

export default UserProfile;
// userLoogedIn && userLoogedIn._id === profileUser._id && (
