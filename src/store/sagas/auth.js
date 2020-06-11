import { put } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';

/**
 * function* creates a generator
 * generators are functions that can be incrementally run
 *  
 */
function* logout (action) {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');

  yield put({
    type: actionTypes.AUTH_LOGOUT
  });
}