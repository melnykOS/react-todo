// Core
import React, { Component } from 'react';
import { func, string, bool } from 'prop-types';
import { Form, Control } from 'react-redux-form';

// Instruments
import Styles from './TaskEdit.scss';
import { validateCreateEditInput } from 'helpers';

export default class TaskEdit extends Component {
    static propTypes = {
        completed:       bool.isRequired,
        editTask:        func.isRequired,
        favorite:        bool.isRequired,
        id:              string.isRequired,
        setTaskEditable: func.isRequired,
    };

    componentWillMount () {
        const { message, formActions } = this.props;

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

    handleKeyPress = (event) => {
        const { value: message } = event.target;
        const { editTask } = this.props;

        if (event.key === 'Enter') {
            event.preventDefault();
            editTask(message);
        } else if (message && !validateCreateEditInput(message)) {
            event.preventDefault();
        }
    };

    moveCaretAtEnd = (event) => {
        const length = event.target.value.length;

        event.target.setSelectionRange(length, length);
    };

    render () {

        return (
            <Form model = 'taskForms.edit'>
                <Control
                    autoFocus
                    className = { Styles.edit }
                    id = 'taskForms.edit.message'
                    model = 'taskForms.edit.message'
                    type = 'message'
                    onChange = { this.handleOnChange }
                    onFocus = { this.moveCaretAtEnd }
                    onKeyPress = { this.handleKeyPress }
                />
            </Form>
        );
    }
}
