export enum UserFromTokenTypes {
   GetUserAndToken = 'userAndToken/get',
   SetUserAndToken = 'userAndToken/set',
   UpdateUserOrToken = 'userAndToken/update',
}

export type UserFromTokenActions = {
   type: UserFromTokenTypes.GetUserAndToken;
} | {
   type: UserFromTokenTypes.SetUserAndToken;
   loggedUser: LoggedUser;
}  | {
   type: UserFromTokenTypes.UpdateUserOrToken;
   loggedUser: Partial<LoggedUser>;
};

export interface LoggedUser {
   token: string;
   user: {
      _id?: string;
      email?: string;
      name?: string;
   };
}

export interface UserInfoState {
   loggedUser: LoggedUser;
}

export const initialState: UserInfoState = {
   loggedUser: {
      token: '',
      user: {},
   },
};
