import * as C from './constants';

export function setUserAndToken(loggedUser: C.LoggedUser) {
   return {
      loggedUser,
      type: C.UserFromTokenTypes.SetUserAndToken,
   } as C.UserFromTokenActions;
}

export function getUserFromToken() {
   return {
      type: C.UserFromTokenTypes.GetUserAndToken,
   } as C.UserFromTokenActions;
}
