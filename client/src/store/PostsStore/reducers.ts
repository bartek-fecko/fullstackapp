import * as C from './constants';

const postsReducer = (state: C.PostsState = C.initialState, action: C.PostsActions) => {
   switch (action.type) {
      case C.PostsTypes.PostsLoading:
         return {
            ...state,
            isLoading: action.isLoading,
         };
      case C.PostsTypes.PostsRequestSucess:
         return {
            ...state,
            data: action.data,
            isLoading: false,
         };
      case C.PostsTypes.PostsError:
         return {
            ...state,
            error: action.error,
            isLoading: false,
         };
      default:
         return state;
   }
};

export default postsReducer;
