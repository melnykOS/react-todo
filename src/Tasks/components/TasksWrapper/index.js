// Core
import React, { Component } from 'react';
import { func, instanceOf, shape } from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from 'react-redux-form';

import Styles from './TasksWrapper.scss';

// Components
import TaskSearch from '../TaskSearch';
import TaskInput from '../TaskInput';
import TaskList from '../TaskList';
import { tasksActions } from 'Tasks/actions';

// Instruments
import Checkbox from 'theme/assets/Checkbox';
import { config } from 'helpers';

const mapStateToProps = (state, props) => {
    console.log(state)
    return {
        tasks:        state.tasks.get('list'),
        editable:     state.tasks.get('editable'),
        completedAll: state.tasks.get('completedAll'),
        search:       state.taskForms.search.text,
    };
};

const mapDispatchToProps = (dispatch, props) => {

    return {
        actions: bindActionCreators({
            ...tasksActions,
            actions,
        }, dispatch),
    };
};

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
        const { actions: taskActions, tasks, editable, completedAll, search } = this.props;
        const { fetchTasks, createTask, deleteTask, editTask, setTaskEditable, setTasksCompleted } = taskActions;
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
                            editTask = { editTask }
                            editable = { editable }
                            setTasksCompleted = { setTasksCompleted }
                            tasks = { tasks }
                            setTaskEditable = { setTaskEditable }
                        />
                    </section>
                    { footerWrapper }
                </main>
            </section>
        );
    }
}
