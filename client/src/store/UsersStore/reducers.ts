import * as C from './constants';

const usersReducer = (state: C.UsersState = C.initialState, action: C.UsersActions) => {
   switch (action.type) {
      case C.UsersTypes.UsersLoading:
         return {
            ...state,
            isLoading: action.isLoading,
         };
      case C.UsersTypes.UsersRequestSucess:
         return {
            ...state,
            data: action.data,
            isLoading: false,
         };
      case C.UsersTypes.UsersError:
         return {
            ...state,
            error: action.error,
            isLoading: false,
         };
      default:
         return state;
   }
};

export default usersReducer;
