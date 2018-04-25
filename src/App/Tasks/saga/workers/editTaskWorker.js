import { call, put } from 'redux-saga/effects';

import { config } from 'helpers';
import { tasksActions } from 'App/Tasks/actions';

export function* editTaskWorker ({ payload: body }) {
    const { api, token } = config;

    try {
        const response = yield call(fetch, api, {
            method:  'PUT',
            headers: {
                'Content-Type':  'application/json',
                'Authorization': token,
            },
            body: JSON.stringify(body),
        });
        const { data: tasks, message } = yield call([response, response.json]);

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield put(tasksActions.editTaskSuccess(tasks));
    } catch (error) {
        yield put(tasksActions.editTaskFail(error));
        // showError(message);
    }
}
