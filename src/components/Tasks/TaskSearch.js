// Core
import React, { Component } from 'react';
import Styles from './TaskInputs.scss';
import { func } from 'prop-types';

export default class TaskSearch extends Component {
    static propTypes = {
        fetchTasks: func.isRequired,
    };

    state = {
        searchText: '',
    }

    componentWillMount () {
        const searchText = localStorage.getItem('search') || '';

        this.setState(() => ({
            searchText,
        }));
    }

    componentDidMount () {
        const { searchText } = this.state;

        this.props.fetchTasks(searchText);
    }

    searchTasks = (e) => {
        const { value } = e.target;

        this.setState(() => ({
            searchText: value,
        }));
        this.props.fetchTasks(value);
        localStorage.setItem('search', value);
    }

    render () {
        const { searchText } = this.state;

        return (
            <input
                className = { Styles.inputs }
                placeholder = 'Поиск'
                type = 'search'
                value = { searchText }
                onChange = { this.searchTasks }
            />
        );
    }
}
