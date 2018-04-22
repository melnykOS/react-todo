// Core
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// Instruments
import store from './init/store';
import './theme/reset.css';

// App
import Main from './pages/Main';

render(
    <Provider store = { store }>
        <Main />
    </Provider>,
    document.getElementById('root'));
