import {createStore, combineReducers,applyMiddleware} from 'redux';
import promise from 'redux-promise-middleware';
import customerReducer from './reducers/customerReducer';
import searchReducer from './reducers/searchReducer';
const rootReducer = combineReducers({
    customerReducer: customerReducer,
    searchReducer: searchReducer
})

export default createStore(rootReducer, applyMiddleware(promise));