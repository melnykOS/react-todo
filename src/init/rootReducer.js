// Core
import React from 'react';
import { combineReducers } from 'redux';

// Instruments
import * as tasks from 'Tasks/reducer';

export const rootReducer = combineReducers({
    ...tasks
});
