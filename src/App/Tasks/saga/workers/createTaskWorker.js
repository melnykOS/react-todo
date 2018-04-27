import { call, put, select } from 'redux-saga/effects';
import { actions } from 'react-redux-form';

import { config, validateCreateEditInput } from 'helpers';
import { tasksActions } from 'App/Tasks/actions';

export function* createTaskWorker ({ payload: message }) {
    const { api, token } = config;

    if (!validateCreateEditInput(message.slice(1))) {
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

        const search = (state) => state.cart;

        yield put(actions.reset('taskForms.create'));
        yield select(search);
        if (search) {
            yield put(tasksActions.fetchTasks({ search: '' }));
            yield put(actions.reset('taskForms.search'));
        } else {
            yield put(tasksActions.createTaskSuccess(task));
        }
    } catch (error) {
        yield put(tasksActions.createTaskFail(error));
    }
}
