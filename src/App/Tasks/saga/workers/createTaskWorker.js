import { call, put, select } from 'redux-saga/effects';
import { actions } from 'react-redux-form';

import { config, validateCreateEditInput } from 'helpers';
import { tasksActions } from 'App/Tasks/actions';

export function* createTaskWorker ({ payload: message }) {
    const { api, token } = config;

    if (message.length !== 1 && !validateCreateEditInput(message.slice(1))) {
        return yield false;
    }
    try {
        const response = yield call(fetch, api, {
            method:  'POST',
            headers: {
                'Content-Type':  'application/json',
                'Authorization': token,
            },
            body: JSON.stringify({ message }),
        });
        const { data: task, error } = yield call([response, response.json]);

        if (response.status !== 200) {
            throw new Error(error);
        }

        const store = (state) => state.taskForms.search.text;
        const search =  yield select(store);

        yield put(actions.reset('taskForms.create'));
        if (search !== '') {
            yield put(actions.reset('taskForms.search'));
            yield put(tasksActions.fetchTasks({ search: '', page: 1 }));
        } else {
            yield put(tasksActions.createTaskSuccess(task));
        }
    } catch (error) {
        yield put(tasksActions.createTaskFail(error));
    }
}
