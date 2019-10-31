import { Request } from 'express';
import { IUser } from '../../db/models/user/constants';

export enum PostErrors {
   fileNotUploaded = 'File couldn\'t be uploaded',
}

export interface PostRequest extends Request {
   profile?: IUser;
}
