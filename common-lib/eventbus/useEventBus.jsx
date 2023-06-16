import { useState } from "react";
import { eventBus } from './eventBus'

export const useEventBus = () => {
    const [evntBus, setEvntBus] = useState(eventBus());
    return evntBus;
};