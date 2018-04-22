import v4 from 'uuid';

import types from './types';

export const notificationsActions = Object.freeze({
    invoke: (error) => ({
        type:    types.INVOKE,
        payload: {
            id: v4(),
            error,
        },
    }),
    dissolve: (id) => ({
        type:    types.DISSOLVE,
        payload: id,
    }),
});
