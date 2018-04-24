// Core
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// Instruments
import store from './init/store';
import './theme/reset.css';

// App
import Main from './pages/Main';

store.subscribe(() => {
    const { forms, ...state } = store.getState().taskForms;

    localStorage.setItem('<<TASK_FORMS>>', JSON.stringify(state));
});

render(
    <Provider store = { store }>
        <Main />
    </Provider>,
    document.getElementById('root')
);
