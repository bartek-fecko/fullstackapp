import * as React from 'react';
import useLocalStorage from 'react-use-localstorage';

const isUserLoggedIn = () => {
   const [token] = useLocalStorage('jwt-token');
   return token;
};

export default isUserLoggedIn;
