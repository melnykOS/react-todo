// Core
import { createStore, compose, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

// Instruments
import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';
import { notifications } from './middleware';

const dev = process.env.NODE_ENV === 'development';
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const composeEnhancers = dev && devtools ? devtools : compose;

const logger = createLogger({
    duration:  true,
    collapsed: true,
    diff:      true,
    colors:    {
        title:     () => '#139BFE',
        prevState: () => '#1C5FAF',
        action:    () => '#149945',
        nextState: () => '#A47104',
        error:     () => '#ff0005',
    },
});

const sagaMiddleware = createSagaMiddleware();

const middleware = [
    sagaMiddleware
];

if (dev) {
    middleware.push(logger);
    middleware.push(notifications);
}


const preloadState = JSON.parse(localStorage.getItem('<<TASKS>>')) || {};

export default createStore(
    rootReducer,
    preloadState,
    composeEnhancers(applyMiddleware(...middleware))
);

sagaMiddleware.run(rootSaga);
