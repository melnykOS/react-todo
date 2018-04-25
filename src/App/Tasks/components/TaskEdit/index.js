// Core
import React, { Component } from 'react';
import { func, string, bool } from 'prop-types';
import { Form, Control } from 'react-redux-form';

// Instruments
import Styles from './TaskEdit.scss';

export default class TaskEdit extends Component {
    static propTypes = {
        completed:       bool.isRequired,
        editTask:        func.isRequired,
        favorite:        bool.isRequired,
        // formActions:     func.isRequired,
        id:              string.isRequired,
        message:         string.isRequired,
        setTaskEditable: func.isRequired,
    };

    state = {
        message: '',
    }

    componentWillMount () {
        const { message, setMessage, formActions } = this.props;
        
        // this.setState(() => ({ message }));
        // setMessage(message);
        console.log(formActions)
        formActions.change('taskForms.edit.message', message);
    }

    componentDidMount () {
        window.addEventListener('keydown', this.handleEscape);
    }

    componentWillUnmount () {
        window.removeEventListener('keydown', this.handleEscape);
    }

    handleEscape = (event) => {
        if (event.key === 'Escape') {
            this.props.setTaskEditable();
        }
    }

    handleOnChange = (event) => {
        const { value: message } = event.target;

        // this.props.setMessage(message);
        // this.setState(() => ({
        //     message,
        // }));
    };

    handleKeyPress = (event) => {
        // const { message } = this.state;

        if (event.key === 'Enter') {
            event.preventDefault();
            const task = {
                message: event.target.value,
            };
            console.log(task)
            this.props.editTask(event.target.value);
        }
    };

    moveCaretAtEnd = (event) => {
        const length = event.target.value.length;

        event.target.setSelectionRange(length, length);
    };

    render () {
        // const { message } = this.state;

        return (
            <Form model = 'taskForms.edit'>
                <Control
                    autoFocus
                    className = { Styles.edit }
                    id = 'taskForms.edit.message'
                    model = 'taskForms.edit.message'
                    type = 'message'
                    // value = { message }
                    onChange = { this.handleOnChange }
                    onFocus = { this.moveCaretAtEnd }
                    onKeyPress = { this.handleKeyPress }
                />
            </Form>
        );
    }
}
