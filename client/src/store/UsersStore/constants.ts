export enum UsersTypes {
   UsersRequestData = 'Articles/GET',
   UsersRequestSucess = 'Articles/Sucess',
   UsersLoading = 'Articles/Loading',
   UsersError = 'Articles/Error',
}

export type UsersActions = {
   type: UsersTypes.UsersLoading;
   isLoading: true;
} | {
   type: UsersTypes.UsersRequestData;
   // articlesPerPage: number;
} | {
   type: UsersTypes.UsersRequestSucess;
   data: Users[];
} | {
   type: UsersTypes.UsersError;
   error: Error;
};

export interface Users {
   _id: string;
   name: string;
   email: string;
}

export interface UsersState {
   isLoading: boolean;
   data: Users[];
   error: Error | false;
}

export const initialState: UsersState = {
   data: [],
   error: false,
   isLoading: false,
};
