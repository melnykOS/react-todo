import { call, put } from 'redux-saga/effects';

import { config } from 'helpers';
import { tasksActions } from 'Tasks/actions';

export function* deleteTaskWorker ({ payload: id }) {
    const { api, token } = config;

    try {
        const response = yield call(fetch, `${api}/${id}`, {
            method:  'DELETE',
            headers: {
                'Authorization': token,
            },
        });

        if (response.status !== 204) {
            throw new Error('Delete task error');
        }

        yield put(tasksActions.deleteTaskSuccess(id));
    } catch ({ message }) {
        yield put(tasksActions.deleteTaskFail());
        // showError(message);
    }
}
