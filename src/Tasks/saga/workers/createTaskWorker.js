import { call, put } from 'redux-saga/effects';

import { config } from 'helpers';
import { tasksActions } from 'Tasks/actions';

export function* createTaskWorker ({ payload: message }) {
    const { api, token } = config;

    if (!message) {
        return false;
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
        yield put(tasksActions.createTaskSuccess(task));
        // this.setState(({ tasks }) => ({
        //     tasks: sortByFavComplete(fromJS([data, ...tasks])),
        // }));

        return true;
    } catch (error) {
        yield put(tasksActions.createTaskFail(error));
        // showError(error.message);

        return false;
    }
};
