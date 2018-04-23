import { call, put } from 'redux-saga/effects';

import { config } from 'helpers';
import { tasksActions } from 'Tasks/actions';

export function* editTaskWorker ({ payload: body }) {
            const { api, token } = config;

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
                
                // data.forEach((el) => {
                //     this.setState(({ tasks }) => ({
                //         tasks: sortByFavComplete(fromJS(tasks).map((task) => task.get('id') === el.id ? Map(el) : task)),
                //     }));
                // });
                // callback ? callback() : null;
                yield put(tasksActions.editTaskSuccess(tasks));
                return true;
            } catch (error) {
                yield put(tasksActions.editTaskFail(error));
                // showError(message);

                return false;
            }
};
