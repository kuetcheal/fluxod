// store.js
import { createStore } from 'redux';
import rootReducer from './reducers'; // Importez votre rootReducer

const store = createStore(rootReducer);

export default store;
