import { call, put } from 'redux-saga/effects';

import { config } from 'helpers';
import { tasksActions } from 'App/Tasks/actions';

export function* fetchTasksWorker ({ payload }) {
    const { api, token } = config;
    const { search, page, size } = payload;

    if (!api || !token) {
        throw new Error('Ошибка связи с сервером, невнрный api или token');
    }

    const url = new URL(api);
    const params = {
        search: search || '',
        page:   page || 1,
        size:   size || 10,
    };

    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
    try {
        yield put(tasksActions.setLoading(true));
        const response = yield call(fetch, url, {
            method:  'GET',
            headers: {
                'Authorization': token,
            },
        });

        const { data: tasks, message } = yield call([response, response.json]);

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield put(tasksActions.fetchTasksSuccess(tasks));
        yield put(tasksActions.setLoading(false));
    } catch (error) {
        yield put(tasksActions.fetchTasksFail(error));
        yield put(tasksActions.isLoading(false));
    }
}
