import { UserFromTokenActions, UserFromTokenTypes } from '#/store/JwtStore/constants';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import {
   Link as RouterLink,
   LinkProps as RouterLinkProps,
} from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';

const Logout = React.forwardRef<HTMLAnchorElement, RouterLinkProps>((props, ref) => {
   const dispatch = useDispatch();
   const [_, setToken] = useLocalStorage('jwt-token', '');

   const logout = async () => {
      try {
         setToken('');
         await fetch('/api/users/logout');
         dispatch({
            loggedUser: {
               token: '',
               user: {},
            },
            type: UserFromTokenTypes.SetUserAndToken,
         } as UserFromTokenActions);
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
