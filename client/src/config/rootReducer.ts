import userWithToken from '#/store/JwtStore/reducers';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
   userWithToken,
});

export default rootReducer;
