import { BehaviorSubject } from 'rxjs'

const key = "____mfe_event_bus____";
export const eventBus = () => {
    if (!window[key]) {
        const _eventBus = {}
        const _addEventBus = (e) => {
            if (!_eventBus[e])
                _eventBus[e] = new BehaviorSubject({ value: undefined });
        }
        window[key] = {
            dispatch: (event, payload) => {
                _addEventBus(event)
                _eventBus[event].next(payload);
            },
            on: (event, action) => {
                _addEventBus(event);
                return _eventBus[event].subscribe(action);
            }
        }
    }

    return window[key];
}
