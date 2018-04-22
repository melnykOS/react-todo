// Instruments
import types from './types';
import { List, fromJS } from 'immutable';

const initialState = List([]);

export default (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_TASKS_SUCCESS:
            return fromJS(action.payload);
            
        case types.CREATE_TASK_SUCCESS:
            return state.unshift(fromJS(action.payload));
            
        case types.DELETE_TASK_SUCCESS:
            console.log(action)
            return state.filter((task) => task.get('id') !== action.payload);

        case types.EDIT_TASK_SUCCESS:
            const taskIdToLike = state.findIndex((task) => task.get('id') === action.payload.taskId);
            return state.updateIn(
                [taskIdToLike, 'likes'], (likedBy) => 
                    likedBy.push(action.payload.user)
            );

        default:
            return state;
    }
};
