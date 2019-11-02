import * as C from './constants';

const JwtReducer = (state: C.UserInfoState = C.initialState, action: C.UserFromTokenActions) => {
   switch (action.type) {
      case C.UserFromTokenTypes.SetUserAndToken:
         return {
            ...state,
            loggedUser: action.loggedUser,
         };
      case C.UserFromTokenTypes.GetUserAndToken:
         return {
            ...state,
         };
      default:
         return state;
   }
};

export default JwtReducer;
