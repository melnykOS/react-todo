// Core
import { toast } from 'react-toastify';

// Instruments
import { Validate as V } from './validate';

export { config } from './config';
export { Validate } from './validate';

let toastId = null;

export const sortByFavComplete = (data) => data
    .sortBy((e) => -e.get('favorite'))
    .sortBy((e) => e.get('completed'));

export const showError = (errorText, errorType) => {
    const type = errorType || 'error';

    if (!toast.isActive(toastId)) {
        toastId = toast(errorText, { type });
    } else {
        toast.update(toastId, { render: errorText, autoClose: 5000, type });
    }
};

export const validateCreateEditInput = (text) => {
    const error = V.isEmpty(text.trim()) || V.isValidLength(text.trim(), 46);

    if (error === null) {
        return true;
    }
    showError(error);

    return false;
};
