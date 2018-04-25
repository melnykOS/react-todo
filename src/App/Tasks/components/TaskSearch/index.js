// Core
import React, { Component } from 'react';
import { func } from 'prop-types';
import { Form, Control } from 'react-redux-form';

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
        const { search, fetchTasks } = this.props;

        fetchTasks({ search });
    }

    searchTasks = (event) => {
        const { value: search } = event.target;

        this.props.fetchTasks({ search, page: 1 });
        localStorage.setItem('search', search);
    }

    render () {

        return (
            <Form model = 'taskForms.search'>
                <Control
                    className = { Styles.input }
                    id = 'taskForms.search.text'
                    model = 'taskForms.search.text'
                    placeholder = 'Поиск'
                    type = 'search'
                    onChange = { this.searchTasks }
                />
            </Form>
        );
    }
}
