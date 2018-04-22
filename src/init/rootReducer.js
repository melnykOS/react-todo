// Core
import React from 'react';
import { combineReducers } from 'redux';
// import { routerReducer as router } from 'react-router-redux'

// Instruments
import tasks from 'Tasks/reducer';

export const rootReducer = combineReducers({
    tasks
});
