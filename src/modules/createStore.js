import { createStore, combineReducers, compose } from 'redux';
import userReducer from './User';

const reduxStore = () => {
  const store = createStore(
    combineReducers(
      {
        userId: userReducer,
      },
      compose(
        process.env.NODE_ENV === 'development' && window.devToolsExtension
          ? window.devToolsExtension()
          : f => f
      )
    )
  );

  return store;
};

export default reduxStore;
