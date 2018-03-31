// Core
import React, { Component } from 'react';
import { forEachObjIndexed, propEq, find } from 'ramda';

// Instruments
import { config, sortByFavComplete, showError } from '../../helpers';

const withApi = (Injectable) => {
    class API extends Component {
        state = {
            tasks: [],
        }

        _fetchTasks = async (search, page, size) => {
            const { api, token } = config;
            const url = new URL(api);
            const params = {
                search: search || '',
                page:   page || 1,
                size:   size || 10,
            };

            forEachObjIndexed((v, k) => url.searchParams.append(k, v), params);
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
                    tasks: sortByFavComplete([...data]),
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
                    tasks: sortByFavComplete([data, ...tasks]),
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
                        tasks: sortByFavComplete(tasks.map((task) => task.id === el.id ? el : task)),
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
            const { tasks } = this.state;

            try {
                if (!find(propEq('id', id))(tasks)) {
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
                    tasks: tasks.filter((task) => task.id !== id),
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
