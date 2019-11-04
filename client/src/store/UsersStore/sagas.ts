import { call, put, takeEvery } from 'redux-saga/effects';
import * as Actions from './actions';
import * as C from './constants';

const getUsers = async () => {
   try {
      const response = await fetch(`http://localhost:3000/api/users/`, {
         headers: {
            'Content-type': 'application/json; charset=UTF-8',
         },
      });
      const data = await response.json();
      return data;
   } catch (err) {
      return err;
   }
};

export function* getDataAsync() {
   try {
      yield put(Actions.loading(true));
      const data = yield call(getUsers);
      if (data.error) {
         throw new Error();
      }
      yield put(Actions.requestUsersSucess(data));
   } catch (e) {
      yield put(Actions.error(new Error(e)));
   }
}

export default function* rootSaga() {
   yield takeEvery(C.UsersTypes.UsersRequestData, getDataAsync);
}
