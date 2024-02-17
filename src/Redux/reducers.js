// reducers.js
import { combineReducers } from 'redux';
import monReducer from './monReducer';

const rootReducer = combineReducers({
  monReducer
  // Ajoutez d'autres reducers ici si nécessaire
});

export default rootReducer;
