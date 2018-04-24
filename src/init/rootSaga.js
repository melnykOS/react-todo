import { all } from 'redux-saga/effects';

import tasks from 'Tasks/saga/watchers';

export function* rootSaga () {
    yield all([
        tasks.createTaskWatcher(),
        tasks.deleteTaskWatcher(),
        tasks.fetchTasksWatcher(),
        tasks.editTaskWatcher()
    ]);
}
