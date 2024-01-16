import { combineReducers } from 'redux';
import userReducer from './reducer/UserReducer';
import ProductReducer from './reducer/ProductReducer';
import cartReducer from './reducer/cartReducer';
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers ({
    userReducer,
    ProductReducer,
    cartReducer
})

const store = configureStore ({reducer: rootReducer});

export default store;

