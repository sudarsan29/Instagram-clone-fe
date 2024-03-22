import { createStore } from "redux";
import { combineReducer } from './combinReducer';

export const store = createStore(
    combineReducer
)