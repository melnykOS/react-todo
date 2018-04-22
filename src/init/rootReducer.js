// Core
import React from 'react';
import { combineReducers } from 'redux';

// Instruments
import tasks from 'Tasks/reducer';

export const rootReducer = combineReducers({
    tasks
});
