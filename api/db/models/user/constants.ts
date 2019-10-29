export interface IUser {
   _id: string;
   name: string;
   email: string;
   passwordHash: string;
   encryptPassword(password: string): number | string;
   authenticate(text: string): boolean;
}
