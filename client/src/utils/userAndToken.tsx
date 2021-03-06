import useLocalStorage from 'react-use-localstorage';

export interface IUserFromToken {
   token: string;
   user: {
      _id: string;
      email: string;
      name: string;
   };
}

const userAndToken = (): IUserFromToken | false => {
   const [userInfo] = useLocalStorage('jwt-token');
   if (!userInfo) {
      return false;
   }

   const { token, user } = JSON.parse(userInfo);
   return { token, user };
};

export default userAndToken;
