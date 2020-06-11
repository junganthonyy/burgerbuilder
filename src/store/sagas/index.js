import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, checkAuthTimeoutSaga } from './auth';

/**
 * What happens is when we see the AUTH_INITIATE_LOGOUT
 * happen/run, we'll run the logoutSaga. This is a step
 * between the action creator and the reducer.
 * 
 * logout will first create a AUTH_INITATE_LOGOUT action.
 * Then it hits here, where we listen for it. Then logoutSaga
 * hears runs the generator function, and 'put's another 
 * action that the reducer can listen for?
 */
export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
}