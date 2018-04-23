// Instruments
import types from './types';
import { List, fromJS, Map } from 'immutable';

import { sortByFavComplete } from 'helpers';

const initialState = List([]);

export default (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_TASKS_SUCCESS:
            return sortByFavComplete(fromJS(action.payload));
            
        case types.CREATE_TASK_SUCCESS:
            return state.unshift(fromJS(action.payload));
            
        case types.DELETE_TASK_SUCCESS:
            console.log(action)
            return state.filter((task) => task.get('id') !== action.payload);

        case types.EDIT_TASK_SUCCESS:
            // const taskIdToLike = state.findIndex((task) => task.get('id') === action.payload.taskId);
            action.payload.map((el) => 
                sortByFavComplete(state.map((task) => task.get('id') === el.id ? Map(el) : task))
            );
            console.log(state);
            
            return state;

        default:
            return state;
    }
};
