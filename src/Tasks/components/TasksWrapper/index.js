// Core
import React, { Component } from 'react';
import { func, instanceOf, shape } from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as formActions } from 'react-redux-form';

import Styles from './TasksWrapper.scss';

// Components
import TaskSearch from '../TaskSearch';
import TaskInput from '../TaskInput';
import TaskList from '../TaskList';
import { tasksActions } from 'Tasks/actions';

// Instruments
import Checkbox from 'theme/assets/Checkbox';
import { config } from 'helpers';
console.log(formActions);
console.log(tasksActions);
const mapStateToProps = (state) => ({
    tasks:        state.tasks.get('list'),
    editable:     state.tasks.get('editable'),
    completedAll: state.tasks.get('completedAll'),
    search:       state.taskForms.search.text,
    message:      state.taskForms.create.message,
    edit:         state.taskForms.edit.message,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...tasksActions,
    }, dispatch),
    formActions: bindActionCreators({
        ...formActions
    }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class TasksWrapper extends Component {
    static propTypes = {
        actions: shape({
            createTask: func.isRequired,
            deleteTask: func.isRequired,
            editTask:   func.isRequired,
            fetchTasks: func.isRequired,
        }).isRequired,
        tasks: instanceOf(Immutable.List).isRequired,
    };

    componentWillReceiveProps (nextProps) {
        const { actions } = this.props;

        actions.setTasksCompleted(nextProps.tasks);
    }

    handleCompleteAll = () => {
        const { actions, completedAll, tasks: tasksList } = this.props;
        const tasks = tasksList.map((task) =>
            task.update((t) =>
                t.set('completed', !completedAll))
        );

        actions.editTask(tasks);
    }

    render () {
        console.log(this.props)
        const { actions, tasks, editable, completedAll, search, edit, formActions } = this.props;
        const { fetchTasks, createTask, deleteTask, editTask, setTaskEditable, setTasksCompleted } = actions;
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
                            tasks = { tasks }
                            formActions = { formActions }
                            setTaskEditable = { setTaskEditable }
                            setTasksCompleted = { setTasksCompleted }
                        />
                    </section>
                    { footerWrapper }
                </main>
            </section>
        );
    }
}
