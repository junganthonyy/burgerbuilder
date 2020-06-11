import { put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions/index';

/**
 * function* creates a generator
 * generators are functions that can be incrementally run
 * 
 * put I think is the equivalent of dispatching an action?
 */
export function* logoutSaga (action) {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');

  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga (action) {
  // setTimeout(() => {
  //   dispatch(logout());
  // }, expTime * 1000);
  yield delay(action.expirationTime * 1000);
  put(actions.logout);
}