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

    handleSubmit = (task) => {
        // const { message } = this.state;
        const { createTask } = this.props;
        console.log(task)
        createTask(task.message.trim());
            // this.setState(() => ({
            //     message: '',
            // }));
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
            const task = {
                message: event.target.value,
            }
            this.handleSubmit(task);
        }
    };

    render () {
        const { message } = this.state;

        return (
            <Form 
                onSubmit = { this.handleSubmit }
                model = 'taskForms.create'>
                <Control
                    id = 'taskForms.create.message'
                    model = 'taskForms.create.message'
                    className = { Styles.input }
                    placeholder = 'Описание моей новой задачи'
                    type = 'message'
                    // value = { message }
                    onChange = { this.handleOnChange }
                    onKeyPress = { this.handleKeyPress }
                />
                <button>Добавить задачу</button>
            </Form>
        );
    }
}
