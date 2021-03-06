import { Request } from 'express';
import { IUser } from './../../db/models/user/constants';

export enum UserAuthErros {
   EmailExisits = 'Email already exists.',
   EmailDoesNotExists = 'Email does not exists.',
   DoesntMatch = 'Password doesn\'t match email.',
   UserDoesNotExists = 'User doesn\'t exists.',
   UserNoAuthorized = 'You can\'t perform this action',
}

export enum UserAuthConfirms {
   registerSucceed = 'Reqistered succesfull.',
   userLogout = 'You \'ve been logged out.',
}

export const TokenID = 'token';

export interface UserSignInRequest extends Request {
   body: {
      email: string;
      password: string;
   };
}

export interface UserByIdRequest extends Request {
   profile?: IUser;
}

export interface IsUserAuthorizedRequest extends UserByIdRequest {
   auth?: any;
}
