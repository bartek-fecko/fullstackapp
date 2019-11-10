import * as C from './constants';

export function requestUsers(usersToDisplay = null) {
   return {
      type: C.UsersTypes.UsersRequestData,
   } as C.UsersActions;
}

export function requestUserById(id: string) {
   return {
      type: C.UsersTypes.UsersRequestData,
   } as C.UsersActions;
}

export function requestUsersSucess(data: C.User[]) {
   return {
      data,
      isLoading: false,
      type: C.UsersTypes.UsersRequestSucess,
   };
}

export function loading(isLoading: boolean) {
   return {
      isLoading,
      type: C.UsersTypes.UsersLoading,
   } as C.UsersActions;
}

export function error(isError: Error) {
   return {
      error: isError,
      type: C.UsersTypes.UsersError,
   } as C.UsersActions;
}
