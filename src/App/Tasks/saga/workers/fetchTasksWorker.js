import { call, put, select } from 'redux-saga/effects';
import { Map } from 'immutable';

import { config } from 'helpers';
import { tasksActions } from 'App/Tasks/actions';

export function* fetchTasksWorker ({ payload }) {
    const { api, token } = config;
    const { search, page, size } = payload ? payload : { search: null, page: null, size: null };
    const tasksStore = yield select((state) => state.tasks);
    const formsStore = yield select((state) => state.taskForms);
    const params = tasksStore.get('params');
    const isLoading = tasksStore.get('isLoading');

    if (!api || !token) {
        throw new Error('Ошибка связи с сервером, неверный api или token');
    }

    if (isLoading) {
        return yield false;
    }

    const url = new URL(api);
    const urlParams = Map({
        search: search || formsStore.search.text,
        page:   page || params.get('page'),
        size:   size || params.get('size'),
    });

    urlParams.map((value, key) => url.searchParams.append(key, value));
    try {
        if (search !== null) {
            yield put(tasksActions.clearTasks());
        }
        yield put(tasksActions.setLoading(true));
        const response = yield call(fetch, url, {
            method:  'GET',
            headers: {
                'Authorization': token,
            },
        });
        const { data: tasks, message, meta } = yield call([response, response.json]);

        if (response.status !== 200) {
            throw new Error(message);
        }
        yield put(tasksActions.fetchTasksSuccess({ tasks, meta }));
        yield put(tasksActions.setLoading(false));
    } catch (error) {
        yield put(tasksActions.fetchTasksFail(error));
        yield put(tasksActions.setLoading(false));
    }
}
