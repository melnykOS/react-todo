//Core
import React, { Component } from 'react';
import { func, string, bool, object } from 'prop-types';

//Components
import TaskEdit from '../TaskEdit';

// Instruments
import { showError } from 'helpers';
import Styles from './TaskItem.scss';
import Checkbox from 'theme/assets/Checkbox';
import Delete from 'theme/assets/Delete';
import Edit from 'theme/assets/Edit';
import Star from 'theme/assets/Star';

export default class TaskItem extends Component {
    static propTypes = {
        completed:       bool.isRequired,
        editable:        string.isRequired,
        editTask:        func.isRequired,
        favorite:        bool.isRequired,
        formActions:     object.isRequired,
        id:              string.isRequired,
        message:         string.isRequired,
        setTaskEditable: func.isRequired,
    };

    _editTask = (message) => {
        const { id, editTask, completed, favorite } = this.props;

        editTask([{ id, message, completed, favorite }]);
    };

    handleEdit = () => {
        const { id, completed, setTaskEditable, editable, edit } = this.props;

        if (editable === id) {
            this._editTask(edit);
        } else if (completed) {
            showError('Вы не можете редактировать завершенную задачу!', 'warning');
        } else if (!completed && editable !== id) {
            setTaskEditable(id);
        }
    };

    handleComplete = () => {
        const { id, editTask, completed, favorite, message } = this.props;

        editTask([{ id, message, completed: !completed, favorite }]);
    }

    handleFav = () => {
        const { id, editTask, completed, favorite, message } = this.props;

        editTask([{ id, message, completed, favorite: !favorite }]);
    }

    handleDelete = () => {
        const { deleteTask, id } = this.props;

        deleteTask(id);
    };

    render () {
        const { id, message, completed, favorite, editable, setTaskEditable, formActions } = this.props;
        const showEditField = editable === id;
        const isComplete = completed ? Styles.completed : '';
        const messageWrapper = showEditField
            ? <TaskEdit
                completed = { completed }
                editTask = { this._editTask }
                favorite = { favorite }
                formActions = { formActions }
                id = { id }
                message = { message }
                setMessage = { this._setMessage }
                setTaskEditable = { setTaskEditable }
            />
            : <span onClick = { this.handleEdit }> { message } </span>;

        return (
            <li className = { `${Styles.taskItem} ${isComplete}` }>
                <div>
                    <Checkbox
                        checked = { completed }
                        color1 = '#3B8EF3'
                        color2 = '#FFF'
                        onClick = { this.handleComplete }
                    />
                    { messageWrapper }
                </div>
                <div>
                    <Star
                        checked = { favorite }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this.handleFav }
                    />
                    <Edit color1 = '#3B8EF3' color2 = '#000' onClick = { this.handleEdit } />
                    <Delete color1 = '#3B8EF3' color2 = '#000' onClick = { this.handleDelete } />
                </div>
            </li>
        );
    }
}
