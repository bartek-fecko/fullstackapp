import { makeStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { UserProfileData } from '../constants';

export interface ServerSuccess {
   updatedUser: UserProfileData;
}

export interface ServerError {
   error?: string;
}

export type ServerResponse = ServerSuccess & ServerError;

export enum SuccessfulResponse {
   UserUpdated = 'Profile Successfully updated',
}

export const requiedFields = ['name'];

export type UserProfileDataErrors = {
   [key in keyof Partial<UserProfileData>]: string;
};

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
   },
   submit: {
      margin: theme.spacing(3, 0, 2),
   },
}));
