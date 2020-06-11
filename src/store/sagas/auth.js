import { put, delay } from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from 'axios';

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
  yield put(actions.logout());
}

export function* authUserSaga (action) {
  // dispatch(authStart());
    
  //   const authData = {
  //     email,
  //     password,
  //     returnSecureToken: true
  //   }
  //   let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCcLNGbxgq_Dzxf1pndYqzZTfFnHzUT-ag';
  //   if (!isSignup) {
  //     url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCcLNGbxgq_Dzxf1pndYqzZTfFnHzUT-ag'
  //   }

  //   axios.post(url, authData)
  //     .then((res) => {
  //       const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
  //       localStorage.setItem('token', res.data.idToken);
  //       localStorage.setItem('expirationDate', expirationDate);
  //       localStorage.setItem('userId', res.data.localId);
  //       dispatch(authSuccess(res.data.idToken, res.data.localId));
  //       dispatch(checkAuthTimeout(res.data.expiresIn));
  //     })
  //     .catch(err => {
  //       dispatch(authFail(err.response.data.error));
  //     });

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