// Core
import React, { Component, Fragment } from 'react';
import { ToastContainer } from 'react-toastify';

// Components
import Tasks from 'Tasks';

export default class Main extends Component {
    render () {
        return (
            <Fragment>
                <Tasks />
                <ToastContainer
                    className = { {
                        fontSize: 16,
                    } }
                />
            </Fragment>
        );
    }
}
