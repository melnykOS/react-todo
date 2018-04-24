// Core
import React, { Component } from 'react';
import { func } from 'prop-types';
import { Form, Control } from 'react-redux-form';

// Instruments
import { validateCreateEditInput } from 'helpers';
import Styles from './TaskInput.scss';

export default class TaskInput extends Component {
    static propTypes = {
        createTask: func.isRequired,
    };

    handleSubmit = (task) => {
        const { createTask } = this.props;

        createTask(task.message.trim());
    };

    handleOnChange = (event) => {
        const { value: message } = event.target;

        validateCreateEditInput(message);
    };

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const task = {
                message: event.target.value,
            };

            this.handleSubmit(task);
        }
    };

    render () {

        return (
            <Form
                model = 'taskForms.create'
                onSubmit = { this.handleSubmit }>
                <Control
                    className = { Styles.input }
                    id = 'taskForms.create.message'
                    model = 'taskForms.create.message'
                    placeholder = 'Описание моей новой задачи'
                    type = 'message'
                    onChange = { this.handleOnChange }
                    onKeyPress = { this.handleKeyPress }
                />
                <button>Добавить задачу</button>
            </Form>
        );
    }
}
