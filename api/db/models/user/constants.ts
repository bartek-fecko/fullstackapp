export interface IUser {
   _id: string;
   name: string;
   email: string;
   passwordHash: string;
   updated?: string;
   created?: string;
   encryptPassword(password: string): number | string;
   authenticate(text: string): boolean;
   [key: string]: any;
}
