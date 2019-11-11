import { User } from '../UsersStore/constants';

export enum PostsTypes {
   PostsRequestData = 'Posts/GET',
   PostsRequestSucess = 'Posts/Sucess',
   PostsLoading = 'Posts/Loading',
   PostsError = 'Posts/Error',
}

export type PostsActions = {
   type: PostsTypes.PostsLoading;
   isLoading: true;
} | {
   type: PostsTypes.PostsRequestData;
   // articlesPerPage: number;
} | {
   type: PostsTypes.PostsRequestSucess;
   data: Post[];
} | {
   type: PostsTypes.PostsError;
   error: Error;
};

export interface Post {
   _id: string;
   title: string;
   body: string;
   photo?: string;
   hasPhoto?: string;
   postedBy: Partial<User>;
}

export interface PostsState {
   isLoading: boolean;
   data: Post[];
   error: Error | false;
}

export const initialState: PostsState = {
   data: [],
   error: false,
   isLoading: false,
};
