import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
} from "redux";
import thunk from "redux-thunk";
import appReducer from "../reducers";
import jwtDecode from "jwt-decode";
import { AUTH } from "../constants";

function saveToLocalStorage(store) {
  try {
    const { auth, setting } = store;
    const serializedStore = JSON.stringify({ auth, setting });
    window.localStorage.setItem("store", serializedStore);
  } catch (e) {
    console.log(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serializedStore = window.localStorage.getItem("store");
    if (serializedStore === null) return undefined;
    const { auth, setting } = JSON.parse(serializedStore);
    return { auth, setting };
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

function checkTokenExpirationMiddleware(store) {
  return function (next) {
    return function (action) {
      const token = store.getState().auth.authData?.access_token;
      if (token) {
        const decodedToken = jwtDecode(token);

        if (decodedToken.exp * 1000 < Date.now()) {
          next({ type: AUTH.LOG_OUT });
        } else {
          next(action);
        }
      } else {
        next(action);
      }
    };
  };
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadFromLocalStorage();

const store = createStore(
  appReducer,
  persistedState,
  composeEnhancers(applyMiddleware(thunk, checkTokenExpirationMiddleware))
);

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
