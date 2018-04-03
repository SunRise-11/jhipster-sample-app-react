import { expect } from 'chai';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import authentication, { ACTION_TYPES } from 'app/shared/reducers/authentication';

describe('Authentication reducer tests', () => {
  function isAccountEmpty(state): boolean {
    return Object.keys(state.account).length === 0;
  }

  describe('Common tests', () => {
    it('should return the initial state', () => {
      const toTest = authentication(undefined, {});
      expect(toTest).to.contain({
        loading: false,
        isAuthenticated: false,
        errorMessage: null, // Errors returned from server side
        loginSuccess: false,
        loginError: false, // Errors returned from server side
        showModalLogin: false,
        redirectMessage: null
      });
      expect(isAccountEmpty(toTest));
    });
  });

  describe('Requests', () => {
    it('should detect a request', () => {
      expect(authentication(undefined, { type: REQUEST(ACTION_TYPES.LOGIN) })).to.contain({
        loading: true
      });
      expect(authentication(undefined, { type: REQUEST(ACTION_TYPES.GET_SESSION) })).to.contain({
        loading: true
      });
    });
  });

  describe('Success', () => {
    it('should detect a success on login', () => {
      const toTest = authentication(undefined, { type: SUCCESS(ACTION_TYPES.LOGIN) });
      expect(toTest).to.contain({
        loading: false,
        loginError: false,
        showModalLogin: false,
        loginSuccess: true
      });
    });

    it('should detect a success on get session and be authenticated', () => {
      const payload = { data: { activated: true } };
      const toTest = authentication(undefined, { type: SUCCESS(ACTION_TYPES.GET_SESSION), payload });
      expect(toTest).to.contain({
        isAuthenticated: true,
        loading: false,
        account: payload.data
      });
    });

    it('should detect a success on get session and not be authenticated', () => {
      const payload = { data: { activated: false } };
      const toTest = authentication(undefined, { type: SUCCESS(ACTION_TYPES.GET_SESSION), payload });
      expect(toTest).to.contain({
        isAuthenticated: false,
        loading: false,
        account: payload.data
      });
    });
  });

  describe('Failure', () => {
    it('should detect a failure on login', () => {
      const payload = 'Something happened.';
      const toTest = authentication(undefined, { type: FAILURE(ACTION_TYPES.LOGIN), payload });

      expect(toTest).to.contain({
        errorMessage: payload,
        showModalLogin: true,
        loginError: true
      });
      expect(isAccountEmpty(toTest));
    });

    it('should detect a failure', () => {
      const payload = 'Something happened.';
      const toTest = authentication(undefined, { type: FAILURE(ACTION_TYPES.GET_SESSION), payload });

      expect(toTest).to.contain({
        loading: false,
        isAuthenticated: false,
        showModalLogin: true,
        errorMessage: payload
      });
      expect(isAccountEmpty(toTest));
    });
  });

  describe('Other cases', () => {
    it('should properly reset the current state when a logout is requested', () => {
      const toTest = authentication(undefined, { type: ACTION_TYPES.LOGOUT });
      expect(toTest).to.contain({
        loading: false,
        isAuthenticated: false,
        loginSuccess: false,
        errorMessage: null,
        loginError: false,
        redirectMessage: null,
        showModalLogin: true
      });
      expect(isAccountEmpty(toTest));
    });

    it('should properly define an error message and change the current state to display the login modal', () => {
      const message = 'redirect me please';
      const toTest = authentication(undefined, { type: ACTION_TYPES.ERROR_MESSAGE, message });
      expect(toTest).to.contain({
        loading: false,
        isAuthenticated: false,
        loginSuccess: false,
        errorMessage: null,
        loginError: false,
        redirectMessage: message,
        showModalLogin: true
      });
      expect(isAccountEmpty(toTest));
    });

    it('should clear authentication', () => {
      const message = 'redirect me please';
      const toTest = authentication(undefined, { type: ACTION_TYPES.CLEAR_AUTH, message });
      expect(toTest).to.contain({
        loading: false,
        showModalLogin: true,
        isAuthenticated: false
      });
    });
  });
});
