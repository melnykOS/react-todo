// Core
import React, { Component } from 'react';
import { func, instanceOf, bool, string, object } from 'prop-types';
import FlipMove from 'react-flip-move';
import { List } from 'immutable';

// Components
import TaskItem from '../TaskItem';

// Instruments
import Styles from './TaskList.scss';

export default class TaskList extends Component {
    static propTypes = {
        deleteTask:      func.isRequired,
        edit:            string.isRequired,
        editable:        string.isRequired,
        editTask:        func.isRequired,
        formActions:     object.isRequired,
        isLoading:       bool.isRequired,
        setTaskEditable: func.isRequired,
        tasks:           instanceOf(List).isRequired,
    };

    render () {
        const { editTask, tasks, deleteTask, editable, setTaskEditable, formActions, edit, isLoading } = this.props;
        const taskList = tasks.map((task) => (
            <TaskItem
                completed = { task.get('completed') }
                deleteTask = { deleteTask }
                edit = { edit }
                editable = { editable }
                editTask = { editTask }
                favorite = { task.get('favorite') }
                formActions = { formActions }
                id = { task.get('id') }
                key = { task.get('id') }
                message = { task.get('message') }
                setTaskEditable = { setTaskEditable }
            />
        ));
        const taskListWrapper = taskList.size > 0
            ? <FlipMove duration = { 450 } easing = 'ease-out'>
                { taskList }
            </FlipMove>
            : <p className = { Styles.noTask }> { isLoading ? '...' : 'Нет задач!' } </p>;

        return (
            <ul className = { Styles.taskList }>
                { taskListWrapper }
            </ul>
        );
    }
}
