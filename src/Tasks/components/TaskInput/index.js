// Core
import React, { Component } from 'react';
import { func } from 'prop-types';

// Instruments
import { validateCreateEditInput } from 'helpers';
import Styles from './TaskInput.scss';

export default class TaskInput extends Component {
    static propTypes = {
        createTask: func.isRequired,
    };

    state = {
        message: '',
        error:   '',
    }

    componentWillMount () {
        const message = localStorage.getItem('message') || '';

        this.setState(() => ({
            message,
        }));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { message } = this.state;
        const { createTask } = this.props;

        validateCreateEditInput(message) &&
            createTask({
                message:   message.trim(),
                completed: false,
                favorite:  false,
            }).then((val) => val &&
                this.setState(() => ({
                    message: '',
                }))
            );
    };

    handleOnChange = (event) => {
        const { value: message } = event.target;
        validateCreateEditInput(message);
        this.setState(() => ({
            message,
        }));
        
        localStorage.setItem('message', message);
    };

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.handleSubmit(event);
        }
    };

    render () {
        const { message } = this.state;

        return (
            <form onSubmit = { this.handleSubmit }>
                <input
                    className = { Styles.input }
                    placeholder = 'Описание моей новой задачи'
                    type = 'message'
                    value = { message }
                    onChange = { this.handleOnChange }
                    onKeyPress = { this.handleKeyPress }
                />
                <button>Добавить задачу</button>
            </form>
        );
    }
}
