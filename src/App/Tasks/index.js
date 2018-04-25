import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as formActions } from 'react-redux-form';

import { tasksActions } from 'App/Tasks/actions';
import TasksWrapper from './components/TasksWrapper';

const mapStateToProps = (state) => ({
    tasks:        state.tasks.get('list'),
    editable:     state.tasks.get('editable'),
    completedAll: state.tasks.get('completedAll'),
    isLoading:    state.tasks.get('isLoading'),
    search:       state.taskForms.search.text,
    message:      state.taskForms.create.message,
    edit:         state.taskForms.edit.message,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...tasksActions,
    }, dispatch),
    formActions: bindActionCreators({
        ...formActions,
    }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksWrapper);
