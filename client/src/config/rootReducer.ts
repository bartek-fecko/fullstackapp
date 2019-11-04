import userWithToken from '#/store/JwtStore/reducers';
import users from '#/store/UsersStore/reducers';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
   userWithToken,
   users,
});

export default rootReducer;
