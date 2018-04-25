import { call, put } from 'redux-saga/effects';

import { config, validateCreateEditInput } from 'helpers';
import { tasksActions } from 'App/Tasks/actions';

export function* editTaskWorker ({ payload: body }) {
    const { api, token } = config;

    if (body[0] && !validateCreateEditInput(body[0].message.slice(1))) {
        return yield false;
    }

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
        yield put(tasksActions.setTaskEditable());
    } catch (error) {
        yield put(tasksActions.editTaskFail(error));
    }
}
