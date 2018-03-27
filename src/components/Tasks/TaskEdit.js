// Core
import React, { Component } from 'react';
import { func, string, bool } from 'prop-types';

// Instruments
import Styles from './TaskEdit.scss';

export default class TaskEdit extends Component {
    static propTypes = {
        completed:   bool.isRequired,
        editTask:    func.isRequired,
        favorite:    bool.isRequired,
        id:          string.isRequired,
        message:     string.isRequired,
        setEditable: func.isRequired,
    };

    state = {
        message: '',
    }

    componentWillMount () {
        const { message, setMessage } = this.props;

        this.setState(() => ({ message }));
        setMessage(message);
    }

    componentDidMount () {
        window.addEventListener('keydown', this.handleEscape);
    }

    componentWillUnmount () {
        window.removeEventListener('keydown', this.handleEscape);
    }

    handleEscape = (event) => {
        if (event.key === 'Escape') {
            this.props.setEditable();
        }
    }

    handleOnChange = (e) => {
        const { value: message } = e.target;

        this.props.setMessage(message);
        this.setState(() => ({
            message,
        }));
    };

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.props.editTask(this.state.message);
        }
    };

    moveCaretAtEnd = (event) => {
        const length = event.target.value.length;

        event.target.setSelectionRange(length, length);
    };

    render () {
        const { message } = this.state;

        return (
            <input
                autoFocus
                className = { Styles.edit }
                type = 'message'
                value = { message }
                onChange = { this.handleOnChange }
                onFocus = { this.moveCaretAtEnd }
                onKeyPress = { this.handleKeyPress }
            />
        );
    }
}
