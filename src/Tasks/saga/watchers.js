import { takeEvery } from 'redux-saga/effects';

import types from '../types';
import { fetchTasksWorker,
    createTaskWorker,
    deleteTaskWorker,
    editTaskWorker
} from './workers';

export default Object.freeze({
    * fetchTasksWatcher () {
        yield takeEvery(types.FETCH_TASKS, fetchTasksWorker);
    },
    * createTaskWatcher () {
        yield takeEvery(types.CREATE_TASK, createTaskWorker);
    },
    * deleteTaskWatcher () {
        yield takeEvery(types.DELETE_TASK, deleteTaskWorker);
    },
    * editTaskWatcher () {
        yield takeEvery(types.EDIT_TASK, editTaskWorker);
    },
});
