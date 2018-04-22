import { all } from 'redux-saga/effects';

import tasks from 'Tasks/saga/watchers';

export function* rootSaga () {
    yield all([
        tasks.createPostWatcher(),
        tasks.deletePostWatcher(),
        tasks.fetchPostsWatcher(),
        tasks.editePostWatcher(),
    ]);
}
