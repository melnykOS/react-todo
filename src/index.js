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
    const { create, search } = store.getState().taskForms;

    localStorage.setItem('<<TASKS>>', JSON.stringify({ taskForms: { create, search }}));
});

render(
    <Provider store = { store }>
        <App />
    </Provider>,
    document.getElementById('root')
);
