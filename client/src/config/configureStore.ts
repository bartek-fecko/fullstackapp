import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
// import mainPageSaga from 'redux/mainPageArticlesRedux/sagas';

const sagaMiddleware = createSagaMiddleware();

function configureStore() {
   return createStore(
      rootReducer,
      applyMiddleware(sagaMiddleware),
   );
}

const store = configureStore();

// sagaMiddleware.run(mainPageSaga);

export default store;
