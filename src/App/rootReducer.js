// Core
import { combineReducers } from 'redux';

// Instruments
import * as tasks from 'App/Tasks/reducer';

export const rootReducer = combineReducers({
    ...tasks,
});
