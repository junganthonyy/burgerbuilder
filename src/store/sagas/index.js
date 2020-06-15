import { all, takeEvery, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import {
  authUserSaga,
  authCheckStateSaga,
  checkAuthTimeoutSaga,
  logoutSaga
} from './auth';
import {
  initIngredientsSaga
} from './burgerBuilder';
import {
  fetchOrdersSaga,
  purchaseBurgerSaga
} from './order';

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
  yield all([
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
    takeEvery(actionTypes.FETCH_ORDERS_INIT, authCheckStateSaga),
  ]);
}

export function* watchBugerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

/*
takeLatest will only run the latest call of the function
useful incase the user spams the buttons
*/
export function* watchOrder() {
  yield takeLatest(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
  yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
}