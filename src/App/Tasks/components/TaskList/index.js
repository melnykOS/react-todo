// Core
import React, { Component } from 'react';
import { func, instanceOf } from 'prop-types';
import FlipMove from 'react-flip-move';
import { List } from 'immutable';

// Components
import TaskItem from '../TaskItem';

// Instruments
import Styles from './TaskList.scss';

export default class TaskList extends Component {
    static propTypes = {
        deleteTask:        func.isRequired,
        editTask:          func.isRequired,
        setTasksCompleted: func.isRequired,
        tasks:             instanceOf(List).isRequired,
    };

    state = {
        loading:  '...',
    }

    componentWillReceiveProps (nextProps) {
        if (!nextProps.tasks.length > 0) {
            this.setState(() => ({
                loading: 'Нет задач!',
            }));
        }
    }

    render () {
        const { editTask, tasks, deleteTask, editable, setTaskEditable, formActions, edit } = this.props;
        const { loading } = this.state;

        const taskList = tasks.map((task) => (
            <TaskItem
                completed = { task.get('completed') }
                deleteTask = { deleteTask }
                edit = { edit }
                editable = { editable }
                editTask = { editTask }
                favorite = { task.get('favorite') }
                id = { task.get('id') }
                key = { task.get('id') }
                message = { task.get('message') }
                formActions = { formActions }
                setTaskEditable = { setTaskEditable }
            />
        ));
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
