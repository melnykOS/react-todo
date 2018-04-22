// Core
import React, { Component } from 'react';

import { fromJS, Map } from 'immutable';
// Instruments
import { config, sortByFavComplete, showError } from 'helpers';

const withApi = (Injectable) => {
    class API extends Component {
        state = {
            tasks: fromJS([]),
        }

        _fetchTasks = async (search, page, size) => {
            const { api, token } = config;

            if (!api || !token) {
                throw new Error('Ошибка связи с сервером, невнрный api или token');
            }

            const url = new URL(api);
            const params = {
                search: search || '',
                page:   page || 1,
                size:   size || 10,
            };

            Object.keys((key) => url.searchParams.append(key, params[key]));
            try {
                const response = await fetch(url, {
                    method:  'GET',
                    headers: {
                        'Authorization': token,
                    },
                });

                if (response.status !== 200) {
                    throw new Error('Load tasks error');
                }

                const { data } = await response.json();

                this.setState(() => ({
                    tasks: sortByFavComplete(fromJS([...data])),
                }));

                return true;
            } catch ({ message }) {
                showError(message);

                return false;
            }
        };

        _createTask = async (task) => {
            const { api, token } = config;

            if (!task.message) {
                return false;
            }
            try {
                const response = await fetch(api, {
                    method:  'POST',
                    headers: {
                        'Content-Type':  'application/json',
                        'Authorization': token,
                    },
                    body: JSON.stringify({ message: task.message }),
                });
                const { data } = await response.json();

                if (response.status !== 200) {
                    throw new Error('Create task error');
                }

                this.setState(({ tasks }) => ({
                    tasks: sortByFavComplete(fromJS([data, ...tasks])),
                }));

                return true;
            } catch (error) {
                showError(error.message);

                return false;
            }
        };

        _editTask = async (body, callback) => {
            const { api, token } = config;

            try {
                const response = await fetch(api, {
                    method:  'PUT',
                    headers: {
                        'Content-Type':  'application/json',
                        'Authorization': token,
                    },
                    body: JSON.stringify(body),
                });
                const { data } = await response.json();

                data.forEach((el) => {
                    this.setState(({ tasks }) => ({
                        tasks: sortByFavComplete(fromJS(tasks).map((task) => task.get('id') === el.id ? Map(el) : task)),
                    }));
                });
                callback ? callback() : null;

                return true;
            } catch ({ message }) {
                showError(message);

                return false;
            }
        }

        _deleteTask = async (id) => {
            const { api, token } = config;
            const { tasks: allTasks } = this.state;

            try {
                if (!allTasks.find((task) => task.get('id') === id)) {
                    return;
                }
                const response = await fetch(`${api}/${id}`, {
                    method:  'DELETE',
                    headers: {
                        'Authorization': token,
                    },
                });

                if (response.status !== 204) {
                    throw new Error('Delete task error');
                }

                this.setState(({ tasks }) => ({
                    tasks: fromJS(tasks).filter((task) => task.get('id') !== id),
                }));

                return true;
            } catch ({ message }) {
                showError(message);

                return false;
            }
        }

        render () {
            return (
                <Injectable
                    createTask = { this._createTask }
                    deleteTask = { this._deleteTask }
                    editTask = { this._editTask }
                    fetchTasks = { this._fetchTasks }
                    { ...this.state }
                />
            );
        }
    }

    return API;
};

export default withApi;
