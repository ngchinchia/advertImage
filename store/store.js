import { createStore, combineReducers } from 'redux';
import activeIndexReducer from './reducers/carousel_reducer/carousel_reducers'

const rootReducer = combineReducers({
  activeIndex: activeIndexReducer,
});

const store = createStore(rootReducer);


export default store;
