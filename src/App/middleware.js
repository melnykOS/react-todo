import { toast } from 'react-toastify';

let toastId = null;

export const notifications = () => (next) => (action) => {
    if (action.error) {
        const type = 'error';
        const errorText = action.payload.message;

        if (!toast.isActive(toastId)) {
            toastId = toast(errorText, { type });
        } else {
            toast.update(toastId, { render: errorText, autoClose: 5000, type });
        }
    }

    return next(action);
};
