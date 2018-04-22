import { List } from 'immutable';

// Instruments
import types from './types';

const initialState = List();

export default (state = initialState, action) => {
    switch (action.type) {
        case types.INVOKE:
            return state.size < 2 ? state.push(action.payload) : state;
        case types.DISSOLVE:
            return state.filter(({ id }) => id !== action.payload);
        default:
            return state;
    }
};
