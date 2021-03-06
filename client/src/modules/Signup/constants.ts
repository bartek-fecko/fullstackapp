import { makeStyles, Theme } from '@material-ui/core/styles';

export interface UserReqisterData {
   name: string;
   email: string;
   password: string;
   passwordConfirm: string;
}

export type UserReqisterDataErrors = {
   [key in keyof Partial<UserReqisterData>]: string;
};

export type ServerResponse = UserReqisterData | { error: string } | { message: string };

export const requiedFields = ['name', 'email', 'password', 'passwordConfirm'];

export enum UserValidationErrors {
   EmailIncorrect = 'This is incorrect email.',
   InvalidPassword = 'Password must contain at least 4 characters!',
}

export enum UserSuccessMessages {
   UserRegisteredSuccessfully = 'User registered successfully. Click to sign in.',
}

export enum PasswordValidation {
   MaxLength = 250,
   MinLength = 4,
}

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
