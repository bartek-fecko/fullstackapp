import { call, put, takeEvery } from 'redux-saga/effects';
import * as Actions from './actions';
import * as C from './constants';

const getPosts = async () => {
   const response = await fetch(`/api/posts`, {
      headers: {
         'Content-type': 'application/json; charset=UTF-8',
      },
   });
   const data = await response.json();
   return data;
};

export function* getDataAsync() {
   try {
      yield put(Actions.loading(true));
      const data = yield call(getPosts);
      if (data.error) {
         throw new Error('Server Errror.');
      }
      yield put(Actions.requestPostsSucess(data));
   } catch (e) {
      yield put(Actions.error(new Error(e)));
   }
}

export default function* rootSaga() {
   yield takeEvery(C.PostsTypes.PostsRequestData, getDataAsync);
}
