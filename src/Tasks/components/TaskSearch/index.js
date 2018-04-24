// Core
import React, { Component } from 'react';
import { func } from 'prop-types';
import { Form, Control, actions } from 'react-redux-form';

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
        console.log(this.props)
        fetchTasks({ search });
        // actions.submit('taskForms.search', this.searchTasks)
    }

    searchTasks = (event) => {
        const { value: search } = event.target;
        // console.log(this.props)
        // this.setState(() => ({
        //     search: search,
        // }));
        // console.log(search)
        this.props.fetchTasks({ search, page: 1 });
        localStorage.setItem('search', search);
    }

    render () {
        const { search } = this.state;

        return (
            <Form model = 'taskForms.search'>
                <Control
                    className = { Styles.input }
                    placeholder = 'Поиск'
                    model = 'taskForms.search.text'
                    id = 'taskForms.search.text'
                    type = 'search'
                    // value = { search }
                    onChange = { this.searchTasks }
                />
            </Form>
        );
    }
}
