// Core
import React, { Component } from 'react';
import { func, instanceOf } from 'prop-types';
import Immutable from 'immutable';

import Styles from './TasksWrapper.scss';

// Components
import TaskSearch from '../TaskSearch';
import TaskInput from '../TaskInput';
import TaskList from '../TaskList';
import withApi from '../../TaskAPI';

// Instruments
import Checkbox from 'theme/assets/Checkbox';
import { config } from 'helpers';

class TasksWrapper extends Component {
    static propTypes = {
        createTask: func.isRequired,
        deleteTask: func.isRequired,
        editTask:   func.isRequired,
        fetchTasks: func.isRequired,
        tasks:      instanceOf(Immutable.List).isRequired,
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
        const tasks = tasksList.map((task) =>
            task.update((t) =>
                t.set('completed', !completedAll))
        );

        this.setState(() => ({
            completedAll: !completedAll,
        }));
        editTask(tasks);
    }

    _isAllChecked = (tasks) => {
        const tasksList = tasks ? tasks : this.props.tasks;
        const completedAll = !!tasksList.findLast((task) => task.get('completed') === false);

        this.setState(() => ({
            completedAll: !completedAll,
        }));
    }

    render () {
        const { fetchTasks, createTask, deleteTask, editTask, tasks } = this.props;
        const { completedAll } = this.state;
        const footerWrapper = tasks.size > 0
            ? <footer>
                <Checkbox
                    checked = { completedAll }
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
