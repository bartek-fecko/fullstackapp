import * as C from './constants';

export function requestPosts() {
   return {
      type: C.PostsTypes.PostsRequestData,
   } as C.PostsActions;
}

export function requestPostsSucess(data: C.Post[]) {
   return {
      data,
      isLoading: false,
      type: C.PostsTypes.PostsRequestSucess,
   };
}

export function loading(isLoading: boolean) {
   return {
      isLoading,
      type: C.PostsTypes.PostsLoading,
   } as C.PostsActions;
}

export function error(isError: Error) {
   return {
      error: isError,
      type: C.PostsTypes.PostsError,
   } as C.PostsActions;
}
