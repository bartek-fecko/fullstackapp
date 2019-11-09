import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import * as React from 'react';
import * as C from './constants';
import UserDeleteModal from './UserDeleteModal';

const UserDelete: React.FC = () => {

   const classes = C.useStyles({});

   return (
      <div className={classes.root}>
         <Paper className={classes.paper}>
            <Grid container spacing={2}>
               <UserDeleteModal />
            </Grid>
         </Paper>
      </div>
   );
};

export default UserDelete;
