import { put, call, delay } from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from 'axios';

/**
 * function* creates a generator
 * generators are functions that can be incrementally run
 * 
 * put I think is the equivalent of dispatching an action?
 */
export function* logoutSaga (action) {
  yield call([localStorage, 'removeItem'], 'token');
  yield call([localStorage, 'removeItem'], 'expirationDate');
  yield call([localStorage, 'removeItem'], 'userId');

  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga (action) {
  // setTimeout(() => {
  //   dispatch(logout());
  // }, expTime * 1000);
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga (action) {
  yield put(actions.authStart());

  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  }

  let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCcLNGbxgq_Dzxf1pndYqzZTfFnHzUT-ag';
  
  if (!action.isSignup) {
    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCcLNGbxgq_Dzxf1pndYqzZTfFnHzUT-ag'
  }

  try {
    const res = yield axios.post(url, authData);
    const expirationDate = yield new Date(new Date().getTime() + res.data.expiresIn * 1000);
    yield localStorage.setItem('token', res.data.idToken);
    yield localStorage.setItem('expirationDate', expirationDate);
    yield localStorage.setItem('userId', res.data.localId);
    yield put(actions.authSuccess(res.data.idToken, res.data.localId));
    yield put(actions.checkAuthTimeout(res.data.expiresIn));

  } catch (err) {
    yield put(actions.authFail(err.response.data.error));
  }   
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem('token');
  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationDate = new Date(yield localStorage.getItem('expirationDate'));
    if (expirationDate > new Date()) {
      const userId = yield localStorage.getItem('userId');
      yield put(actions.authSuccess(token, userId));
      yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
    } else {
      yield put(actions.logout());
    }
  }
}