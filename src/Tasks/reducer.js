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
            return state.filter((post) => post.get('id') !== action.payload);

        case types.EDITE_TASK_SUCCESS:
            const postIdToLike = state.findIndex((post) => post.get('id') === action.payload.postId);
            return state.updateIn(
                [postIdToLike, 'likes'], (likedBy) => 
                    likedBy.push(action.payload.user)
            );

        default:
            return state;
    }
};
