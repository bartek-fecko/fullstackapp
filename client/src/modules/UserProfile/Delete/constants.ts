import { makeStyles, Theme } from '@material-ui/core/styles';

export enum ModalTexts {
   Button = 'Delete profile',
   Body = 'Are you sure you want to delete your account?',
   Title = 'Account removal',
   Disagree = 'Disagree',
   Confirm = 'Confirm',
}

export const useStyles = makeStyles((theme: Theme) => ({
   avatarImg: {
      height: '120px',
      width: '120px',
   },
   joinedDate: {
      fontSize: '0.7rem',
   },
   paper: {
      margin: 'auto',
      maxWidth: 500,
      padding: theme.spacing(2),
   },
   pointerCursor: {
      cursor: 'pointer',
   },
   root: {
      flexGrow: 1,
   },
   unfollowButton: {
      marginLeft: theme.spacing(1),
   },
   userInfo: {
      marginLeft: theme.spacing(4),
   },
}));
