import { configureStore } from '@reduxjs/toolkit';
import { useReducer } from 'react';
import allReducers from './reducers';

const store = configureStore(allReducers);
