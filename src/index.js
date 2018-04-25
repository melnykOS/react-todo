// Core
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// Instruments
import store from './App/store';
import './theme/reset.css';

// App
import App from './App';

store.subscribe(() => {
    const { forms, ...state } = store.getState().taskForms;

    localStorage.setItem('<<TASK_FORMS>>', JSON.stringify(state));
});

render(
    <Provider store = { store }>
        <App />
    </Provider>,
    document.getElementById('root')
);
