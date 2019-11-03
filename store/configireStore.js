// Imports: Dependencies
import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import daysReducer from './../store/reducers/days';
import authReducer from './reducers/auth';

const rootReducer = combineReducers({
  days: daysReducer,
  auth: authReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const storeR = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
let persistor = persistStore(storeR);
export { storeR, persistor };
