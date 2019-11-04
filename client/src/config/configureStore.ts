import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';

import usersSaga from '#/store/UsersStore/sagas';

const sagaMiddleware = createSagaMiddleware();

function configureStore() {
   return createStore(
      rootReducer,
      applyMiddleware(sagaMiddleware),
   );
}

const store = configureStore();

sagaMiddleware.run(usersSaga);

export default store;
