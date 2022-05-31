// Import configureStore from redux toolkit 
import { configureStore } from '@reduxjs/toolkit';

// Import all of our reducers:
import authReducer from './auth/authSlice';

// For next.js we need to use a wrapper, import it:
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

// Create our store using configureStore abstraction over createStore:
const store = configureStore({ reducer: { auth: authReducer }, devTools: true });

// The wrapper expects a makeStore function of type makeStore:
const makeStore = () => store;

// Create the next-redux-wrapper with our store:
// We don't have to export the store, but we do have to export the wrapper
export const wrapper = createWrapper(makeStore);

// Export our store:
// export default store;