export interface IUser {
   _id: string;
   name: string;
   email: string;
   passwordHash: string;
   updated?: string;
   save: (...props: any) => any;
   encryptPassword(password: string): number | string;
   authenticate(text: string): boolean;
   [key: string]: any;
}
