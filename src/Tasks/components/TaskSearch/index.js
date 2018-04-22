// Core
import React, { Component } from 'react';
import { func } from 'prop-types';

import Styles from './TaskInput.scss';

export default class TaskSearch extends Component {
    static propTypes = {
        fetchTasks: func.isRequired,
    };

    state = {
        search: '',
    }

    componentWillMount () {
        const search = localStorage.getItem('search') || '';

        this.setState(() => ({
            search,
        }));
    }

    componentDidMount () {
        const { search } = this.state;

        this.props.fetchTasks({ search });
    }

    searchTasks = (event) => {
        const { value: search } = event.target;

        this.setState(() => ({
            search: search,
        }));
        this.props.fetchTasks({ search, page: 1 });
        localStorage.setItem('search', search);
    }

    render () {
        const { search } = this.state;

        return (
            <input
                className = { Styles.input }
                placeholder = 'Поиск'
                type = 'search'
                value = { search }
                onChange = { this.searchTasks }
            />
        );
    }
}
