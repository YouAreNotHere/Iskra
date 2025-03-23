import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import cartProducts from './cartProducts';
import cartQuantity from "./cartQuantity.tsx";
import deliveryCost from "./deliveryCost.tsx";

const todoApp = combineReducers({ cartProducts, cartQuantity, deliveryCost });
const store = configureStore({ reducer: todoApp });

export default store;
