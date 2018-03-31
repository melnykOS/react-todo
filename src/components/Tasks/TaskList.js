// Core
import React, { Component } from 'react';
import { func, array } from 'prop-types';
import FlipMove from 'react-flip-move';

// Components
import TaskItem from './TaskItem';

// Instruments
import Styles from './TaskList.scss';

export default class TaskList extends Component {
    static propTypes = {
        deleteTask:   func.isRequired,
        editTask:     func.isRequired,
        isAllChecked: func.isRequired,
        tasks:        array.isRequired,
    };

    state = {
        editable: '',
        loading:  '...',
    }

    componentWillReceiveProps (nextProps) {
        if (!nextProps.tasks.length > 0) {
            this.setState(() => ({
                loading: 'Нет задач!',
            }));
        }
    }

    _setEditable = (id) => {
        console.log('onClick');
        this.setState(() => ({
            editable: id ? id : '',
        }));
    }

    render () {
        const { editTask, tasks, deleteTask, isAllChecked } = this.props;
        const { editable, loading } = this.state;

        const taskList = tasks.map(({ id, message, completed, favorite }) => (
            <TaskItem
                completed = { completed }
                deleteTask = { deleteTask }
                editable = { editable }
                editTask = { editTask }
                favorite = { favorite }
                id = { id }
                isAllChecked = { isAllChecked }
                key = { id }
                message = { message }
                setEditable = { this._setEditable }
            />
        ));
        const taskListWrapper = Array.isArray(taskList) && taskList.length > 0
            ? <FlipMove duration = { 450 } easing = 'ease-out'>
                { taskList }
            </FlipMove>
            : <p className = { Styles.noTask }> { loading } </p>;

        return (
            <ul className = { Styles.taskList }>
                { taskListWrapper }
            </ul>
        );
    }
}
