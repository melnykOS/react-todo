// Instruments
import types from './types';
import { List, fromJS, Map } from 'immutable';
import { combineForms } from 'react-redux-form';

import { sortByFavComplete } from 'helpers';

const initialState = Map({
    list:         List([]),
    editable:     '',
    completedAll: false,
    isLoading:    false,
    params:       Map({
        search: '',
        page:   1,
        size:   10,
        total:  5,
    }),
});

export const tasks = (state = initialState, action) => {
    switch (action.type) {
        case types.CLEAR_TASKS:
            return state.set('list', List([]))
                .setIn(['params', 'page'], 1);

        case types.FETCH_TASKS_SUCCESS:
            return state.set('list', sortByFavComplete(state.get('list').concat(fromJS(
                action.payload.tasks))))
                .setIn(['params', 'page'], state.getIn(['params', 'page']) + 1)
                .setIn(['params', 'total'], action.payload.meta.total);

        case types.CREATE_TASK_SUCCESS:
            return state.update('list', (list) => sortByFavComplete(list.unshift(fromJS(action.payload))));

        case types.DELETE_TASK_SUCCESS:
            return state.update('list', (list) => list.filter((task) =>
                task.get('id') !== action.payload));

        case types.EDIT_TASK_SUCCESS:
            if (action.payload.length === 1) {
                const newTask = action.payload[0];

                return state.update('list', (list) => sortByFavComplete(list.map((task) =>
                    task.get('id') === newTask.id ? Map(newTask) : task)));
            }

            return state.set('list', sortByFavComplete(fromJS(action.payload)));

        case types.SET_TASK_EDITABLE:
            return state.set('editable', action.payload || '');

        case types.SET_TASKS_COMPLETED:
            return state.set('completedAll', !fromJS(action.payload).findLast((task) =>
                task.get('completed') === false));

        case types.SET_INPUT_CREATE:
            return state.set('editable', action.payload || '');

        case types.SET_LOADING:
            return state.set('isLoading', action.payload);

        default:
            return state;
    }
};

export const taskForms = combineForms({
    create: {
        message: '',
    },
    search: {
        text: '',
    },
    edit: {
        message: '',
    },
}, 'taskForms');
