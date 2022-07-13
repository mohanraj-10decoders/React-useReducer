import movieReducer from './movies';
import { combineReducers } from 'redux';

const allReducers = combineReducers({ movieReducer });

export default allReducers;
