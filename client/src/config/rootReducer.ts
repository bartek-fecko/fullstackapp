import userWithToken from '#/store/JwtStore/reducers';
import posts from '#/store/PostsStore/reducers';
import users from '#/store/UsersStore/reducers';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
   posts,
   userWithToken,
   users,
});

export default rootReducer;
