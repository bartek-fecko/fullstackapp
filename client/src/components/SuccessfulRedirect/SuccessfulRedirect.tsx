import withRouterLink from '#/utils/withRouterLink';
import { Button, createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import * as React from 'react';

export interface SuccessfulRedirectProps {
   textToDisplay: string;
   redirectPath?: string;
}

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      button: {
         color: '#8bc34a',
         fontSize: theme.spacing(2),
      },
   }),
);

const SuccessfulRedirect: React.FC<SuccessfulRedirectProps> = ({ textToDisplay, redirectPath }) => {
   const classes = useStyles({});

   return (
      <Grid
         container
         spacing={0}
         direction="column"
         alignItems="center"
         justify="center"
         style={{ minHeight: '50vh' }}
      >
         <Grid item xs={3}>
            <Button
               variant="outlined"
               className={classes.button}
               component={redirectPath && withRouterLink}
               to={redirectPath}
            >
               {textToDisplay}
            </Button>
         </Grid>
      </Grid>
   );
};

export default SuccessfulRedirect;
