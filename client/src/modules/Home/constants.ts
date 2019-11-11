import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({

   cardGrid: {
      paddingBottom: theme.spacing(8),
      paddingTop: theme.spacing(8),
   },
   footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
   },
   heroButtons: {
      marginTop: theme.spacing(4),
   },
   heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
   },
   icon: {
      marginRight: theme.spacing(2),
   },
}));
