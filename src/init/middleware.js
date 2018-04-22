import { notificationsActions } from 'Notifications/actions'

export const notifications = (store) => (next) => (action) => {
    if (action.error) {
        store.dispatch(notificationsActions.invoke(action.payload));
    }
    
    return next(action);
};
