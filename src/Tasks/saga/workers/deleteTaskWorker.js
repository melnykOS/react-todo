import { call, put } from 'redux-saga/effects';

import { config } from 'helpers';
import { tasksActions } from 'Tasks/actions';

export function* deleteTaskWorker ({ payload: id }) {
    const { api, token } = config;
    // const { tasks: allTasks } = this.state;
    console.log(id)
    try {
        // if (!allTasks.find((task) => task.get('id') === id)) {
        //     return;
        // }
        const response = yield call(fetch, `${api}/${id}`, {
            method:  'DELETE',
            headers: {
                'Authorization': token,
            },
        });

        if (response.status !== 204) {
            throw new Error('Delete task error');
        }

        // this.setState(({ tasks }) => ({
        //     tasks: fromJS(tasks).filter((task) => task.get('id') !== id),
        // }));
        yield put(tasksActions.deleteTaskSuccess(id));
        return true;
    } catch ({ message }) {
        yield put(tasksActions.deleteTaskFail());
        // showError(message);

        return false;
    }
};
