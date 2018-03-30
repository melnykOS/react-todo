// Core
import React, { Component } from 'react';
import Styles from './TasksWrapper.scss';
import { findLast, propEq } from 'ramda';
import { func, array } from 'prop-types';

// Components
import TaskSearch from './TaskSearch';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import withApi from './TaskAPI';

// Instruments
import Checkbox from 'theme/assets/Checkbox';
import { config } from '../../helpers';

class TasksWrapper extends Component {
    static propTypes = {
        createTask: func.isRequired,
        deleteTask: func.isRequired,
        editTask:   func.isRequired,
        fetchTasks: func.isRequired,
        tasks:      array.isRequired,
    };

    state = {
        completedAll: null,
    }

    componentWillReceiveProps (nextProps) {
        this._isAllChecked(nextProps.tasks);
    }

    handleCompleteAll = () => {
        const { completedAll } = this.state;
        const { editTask, tasks: tasksList } = this.props;
        const tasks = tasksList.map((task) => {
            task.completed = !completedAll;

            return task;
        });

        this.setState(() => ({
            completedAll: !completedAll,
        }));
        editTask(tasks);
    }

    _isAllChecked = (tasks) => {
        const tasksList = tasks ? tasks : this.props.tasks;
        const completedAll = findLast(propEq('completed', false))(tasksList);

        this.setState(() => ({
            completedAll: !completedAll,
        }));
    }

    render () {
        const { fetchTasks, createTask, deleteTask, editTask, tasks } = this.props;
        const footerWrapper = tasks.length > 0
            ? <footer>
                <Checkbox
                    checked = { this.state.completedAll }
                    color1 = '#363636'
                    color2 = '#fff'
                    onClick = { this.handleCompleteAll }
                />
                <code>Все задачи выполнены</code>
            </footer>
            : null;

        return (
            <section className = { Styles.tasks }>
                <main>
                    <header>
                        <h1> { config.title }</h1>
                        <TaskSearch
                            fetchTasks = { fetchTasks }
                        />
                    </header>
                    <section>
                        <TaskInput
                            createTask = { createTask }
                        />
                        <TaskList
                            deleteTask = { deleteTask }
                            editTask = { editTask }
                            isAllChecked = { this._isAllChecked }
                            tasks = { tasks }
                        />
                    </section>
                    { footerWrapper }
                </main>
            </section>
        );
    }
}

export default withApi(TasksWrapper);
