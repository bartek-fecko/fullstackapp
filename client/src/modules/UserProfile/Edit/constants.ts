import { makeStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';

export interface UserEditData {
   email?: string;
   password?: string;
   mainText?: string;
}

export interface ServerSuccess {
   token?: string;
   user?: {
      _id: string;
      email: string;
      name: string;
   };
}

export interface ServerError {
   error?: string;
}

export type ServerResponse = ServerSuccess & ServerError;

export const requiedFields = ['email', 'password'];


export const useStyles = makeStyles((theme: Theme) => ({
   avatar: {
      backgroundColor: theme.palette.secondary.main,
      margin: theme.spacing(1),
   },
   form: {
      marginTop: theme.spacing(1),
      width: '100%',
   },
   paper: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      marginTop: theme.spacing(8),
   },
   submit: {
      margin: theme.spacing(3, 0, 2),
   },
}));
