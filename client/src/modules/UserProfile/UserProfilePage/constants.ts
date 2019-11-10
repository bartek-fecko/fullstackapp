import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
   avatarImg: {
      height: '120px',
      width: '120px',
   },
   paper: {
      margin: 'auto',
      maxWidth: 500,
      padding: theme.spacing(2),
   },
   root: {
      flexGrow: 1,
   },
   joinedDate: {
      fontSize: '0.7rem',
   },
   pointerCursor: {
      cursor: 'pointer',
   },
   userInfo: {
      marginLeft: theme.spacing(4),
   },
}));
