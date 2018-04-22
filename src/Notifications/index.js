// Core
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

let toastId = null;

export const Notification1 = (errorText, errorType) => {
    const type = errorType || 'error';

    if (!toast.isActive(toastId)) {
        toastId = toast(errorText, { type });
    } else {
        toast.update(toastId, { render: errorText, autoClose: 5000, type });
    }
};

export default class Notification extends Component {
   
   
   render () {
       return (
           <ToastContainer
                className = { {
                    fontSize: 16,
                } }
            />
        )
   } 
}