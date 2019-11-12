import { Request } from 'express';
import { IPost } from '../../db/models/post/constants';
import { IUser } from '../../db/models/user/constants';

export enum PostErrors {
   fileNotUploaded = 'File couldn\'t be uploaded.',
   postNotFound = 'Post was not found.',
}

export interface PostRequest extends Request {
   profile?: IUser;
}

export interface PostByIdRequest extends PostRequest {
   post?: IPost;
}

export interface IsPostAuthorizedRequest extends PostRequest {
   post?: IPost;
   auth?: any;
}
