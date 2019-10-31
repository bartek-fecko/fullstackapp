import { IUser } from '../user/constants';

export interface IPost {
   body: string;
   created: string;
   photo: any;
   postedBy: IUser;
   title: string;
   [key: string]: any;
}
