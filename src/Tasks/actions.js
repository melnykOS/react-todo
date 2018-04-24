import types from './types';

export const tasksActions = Object.freeze({
    fetchTasks: (params) => ({
        type:    types.FETCH_TASKS,
        payload: params,
    }),
    fetchTasksSuccess: (tasks) => ({
        type:    types.FETCH_TASKS_SUCCESS,
        payload: tasks,
    }),
    fetchTasksFail: (error) => ({
        type:    types.FETCH_TASKS_FAIL,
        payload: error,
        error:   true,
    }),

    createTask: (task) => ({
        type:    types.CREATE_TASK,
        payload: task,
    }),
    createTaskSuccess: (task) => ({
        type:    types.CREATE_TASK_SUCCESS,
        payload: task,
    }),
    createTaskFail: (error) => ({
        type:    types.CREATE_TASK_FAIL,
        payload: error,
        error:   true,
    }),

    deleteTask: (id) => ({
        type:    types.DELETE_TASK,
        payload: id,
    }),
    deleteTaskSuccess: (id) => ({
        type:    types.DELETE_TASK_SUCCESS,
        payload: id,
    }),
    deleteTaskFail: (error) => ({
        type:    types.DELETE_TASK_FAIL,
        payload: error,
        error:   true,
    }),

    editTask: (data) => ({
        type:    types.EDIT_TASK,
        payload: data,
    }),
    editTaskSuccess: (data) => ({
        type:    types.EDIT_TASK_SUCCESS,
        payload: data,
    }),
    editTaskFail: (error) => ({
        type:    types.EDIT_TASK_FAIL,
        payload: error,
        error:   true,
    }),

    setTaskEditable: (id) => ({
        type:    types.SET_TASK_EDITABLE,
        payload: id,
    }),

    setTasksCompleted: (id) => ({
        type:    types.SET_TASKS_COMPLETED,
        payload: id,
    }),

    setInputCreate: (message) => ({
        type:    types.SET_INPUT_CREATE,
        payload: message,
    }),

    setInputEdit: (message) => ({
        type:    types.SET_INPUT_EDIT,
        payload: message,
    }),

    setSearch: (text) => ({
        type:    types.SET_SEARCH,
        payload: text,
    }),

    getSearch: () => ({
        type: types.SET_SEARCH,
    }),
});
