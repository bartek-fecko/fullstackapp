import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
   body: {
      maxHeight: theme.spacing(15),
   },
   card: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
   },
   cardContent: {
      flexGrow: 1,
   },
   cardMedia: {
      paddingTop: '56.25%',
   },
   fadeButtonWrapper: {
      background: 'rgba(255,255,255,0.93)',
      boxShadow: '-2px -60px 36px -18px rgba(255,255,255,1)',
   },
}));
