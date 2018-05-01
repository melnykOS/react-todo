// Core
import React, { Component } from 'react';
import { func, instanceOf, shape, string, bool, object } from 'prop-types';
import Immutable from 'immutable';

// Components
import TaskSearch from '../TaskSearch';
import TaskInput from '../TaskInput';
import TaskList from '../TaskList';
import Styles from './TasksWrapper.scss';

// Instruments
import Checkbox from 'theme/assets/Checkbox';
import { config } from 'helpers';

export default class TasksWrapper extends Component {
    static propTypes = {
        actions: shape({
            createTask:        func.isRequired,
            deleteTask:        func.isRequired,
            editTask:          func.isRequired,
            fetchTasks:        func.isRequired,
            setTaskEditable:   func.isRequired,
            setTasksCompleted: func.isRequired,
        }).isRequired,
        completedAll: bool.isRequired,
        edit:         string.isRequired,
        editable:     string.isRequired,
        formActions:  object.isRequired,
        isLoading:    bool.isRequired,
        params:       instanceOf(Immutable.Map).isRequired,
        search:       string.isRequired,
        tasks:        instanceOf(Immutable.List).isRequired,
    };

    static getDerivedStateFromProps (nextProps) {
        const { actions } = nextProps;

        actions.setTasksCompleted(nextProps.tasks);

        return null;
    }

    state = {};

    handleCompleteAll = () => {
        const { actions, completedAll, tasks: tasksList } = this.props;
        const tasks = tasksList.map((task) =>
            task.update((t) =>
                t.set('completed', !completedAll))
        );

        actions.editTask(tasks);
    }

    render () {
        const { actions, tasks, editable, completedAll, search, edit, formActions, isLoading, params } = this.props;
        const { fetchTasks, createTask, deleteTask, editTask, setTaskEditable } = actions;
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
                            search = { search }
                        />
                    </header>
                    <section>
                        <TaskInput
                            createTask = { createTask }
                        />
                        <TaskList
                            deleteTask = { deleteTask }
                            edit = { edit }
                            editable = { editable }
                            editTask = { editTask }
                            fetchTasks = { fetchTasks }
                            formActions = { formActions }
                            isLoading = { isLoading }
                            params = { params }
                            setTaskEditable = { setTaskEditable }
                            tasks = { tasks }
                        />
                    </section>
                    { footerWrapper }
                </main>
            </section>
        );
    }
}
