import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';

import postsSaga from '#/store/PostsStore/sagas';
import usersSaga from '#/store/UsersStore/sagas';

const sagaMiddleware = createSagaMiddleware();

function configureStore() {
   return createStore(
      rootReducer,
      composeWithDevTools(
         applyMiddleware(sagaMiddleware),
      ),
   );
}

const store = configureStore();

sagaMiddleware.run(postsSaga);
sagaMiddleware.run(usersSaga);

export default store;
