export enum UsersTypes {
   UsersRequestData = 'Users/GET',
   UsersRequestSucess = 'Users/Sucess',
   UsersLoading = 'Users/Loading',
   UsersError = 'Users/Error',
}

export type UsersActions = {
   type: UsersTypes.UsersLoading;
   isLoading: true;
} | {
   type: UsersTypes.UsersRequestData;
   // articlesPerPage: number;
} | {
   type: UsersTypes.UsersRequestSucess;
   data: User[];
} | {
   type: UsersTypes.UsersError;
   error: Error;
};

export interface User {
   _id: string;
   name: string;
   email: string;
   avatarColor: string;
   userDescription?: string;
   hasPhoto?: boolean;
   image?: string;
   followers?: any;
   following?: any;
}

export interface UsersState {
   isLoading: boolean;
   data: User[];
   error: Error | false;
}

export const initialState: UsersState = {
   data: [],
   error: false,
   isLoading: false,
};
