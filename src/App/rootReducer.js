// Core
import React from 'react';
import { combineReducers } from 'redux';

// Instruments
import * as tasks from 'App/Tasks/reducer';

export const rootReducer = combineReducers({
    ...tasks,
});
