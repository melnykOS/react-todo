import { takeEvery } from 'redux-saga/effects';

import types from '../types';
import { fetchTasksWorker,
        // createTaskWorker,
        // deleteTaskWorker,
        // editeTaskWorker,
} from './workers';

export default Object.freeze({
    * fetchTasksWatcher () {
        yield takeEvery(types.FETCH_TASKS, fetchTasksWorker);
    },
    // * createTaskWatcher () {
    //     yield takeEvery(types.CREATE_TASK, createTaskWorker);
    // },
    // * deleteTaskWatcher () {
    //     yield takeEvery(types.DELETE_TASK, deleteTaskWorker);
    // },
    // * editeTaskWatcher () {
    //     yield takeEvery(types.LIKE_TASK, editeTaskWorker);
    // },
});