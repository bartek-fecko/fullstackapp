import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

interface TabPanelProps {
   children?: React.ReactNode;
   index: any;
   value: any;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
   const useStyles = makeStyles((theme: Theme) => ({
      root: {
      },
   }));

   const classes = useStyles({});

   return (
      <Typography
         component="div"
         role="tabpanel"
         hidden={value !== index}
         id={`simple-tabpanel-${index}`}
         aria-labelledby={`simple-tab-${index}`}
         {...other}
      >
         <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
         >
            <Grid item className={classes.root}>
               <Box p={3}>{children}</Box>
            </Grid>
         </Grid>
      </Typography>
   );
};

export default TabPanel;
