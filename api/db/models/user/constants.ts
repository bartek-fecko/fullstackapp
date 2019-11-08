
export interface IUser {
   _id: string;
   name: string;
   email: string;
   passwordHash: string;
   updated?: string;
   created?: string;
   avatarColor: string;
   hasPhoto?: boolean;
   salt: string;
   photo: {
      data: Buffer,
      contentType: string;
   };
   encryptPassword(password: string): number | string;
   authenticate(text: string): boolean;
   [key: string]: any;
}
