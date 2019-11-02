import * as React from 'react';
import {
   Link as RouterLink,
   LinkProps as RouterLinkProps,
} from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';

const Logout = React.forwardRef<HTMLAnchorElement, RouterLinkProps>((props, ref) => {
   const [_, setToken] = useLocalStorage('jwt-token', '');

   const logout = async () => {
      try {
         setToken('');
         await fetch('http://localhost:3000/api/users/logout');
      } catch (err) {
         // tslint:disable-next-line: no-console
         console.error(err);
      }
   };

   return (
      <RouterLink
         innerRef={ref}
         {...props}
         onClick={logout}
      />
   );
});

export default Logout;
