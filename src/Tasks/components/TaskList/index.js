// Core
import React, { Component } from 'react';
import { func, instanceOf } from 'prop-types';
import FlipMove from 'react-flip-move';
import { List } from 'immutable'

// Components
import TaskItem from '../TaskItem';

// Instruments
import Styles from './TaskList.scss';

export default class TaskList extends Component {
    static propTypes = {
        deleteTask:   func.isRequired,
        editTask:     func.isRequired,
        isAllChecked: func.isRequired,
        tasks:        instanceOf(List).isRequired,
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

        const taskList = tasks.map((task) => (
            <TaskItem
                completed = { task.get('completed') }
                deleteTask = { deleteTask }
                editable = { editable }
                editTask = { editTask }
                favorite = { task.get('favorite') }
                id = { task.get('id') }
                isAllChecked = { isAllChecked }
                key = { task.get('id') }
                message = { task.get('message') }
                setEditable = { this._setEditable }
            />
        ));
        // Array.isArray(taskList) && 
        const taskListWrapper = taskList.size > 0
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
