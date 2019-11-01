export interface UserLoginData {
   email: string;
   password: string;
}

export interface ServerSuccess {
   token?: any;
   user?: {
      _id: string;
      email: string;
      name: string;
   };
}

export interface ServerError {
   error?: string;
}

export type ServerResponse = ServerSuccess & ServerError;

export const requiedFields = ['email', 'password'];
