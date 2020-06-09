import reducer from './auth';
import * as ActionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
  it('should return inital state', () => {
    const initalState = {
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/'
    };
    expect(reducer(undefined, {})).toEqual(initalState);
  })

  it('should store token upon login', () => {
    const initalState = {
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/'
    };

    const action = {
      type: ActionTypes.AUTH_SUCCESS,
      idToken: 'some-token',
      userId: 'some-user-id'
    }

    const expectedState = {
      token: 'some-token',
      userId: 'some-user-id',
      error: null,
      loading: false,
      authRedirectPath: '/'
    }
    expect(reducer(initalState, action)).toEqual(expectedState);

  })
});