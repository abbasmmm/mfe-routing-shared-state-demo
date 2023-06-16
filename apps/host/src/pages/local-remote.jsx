
import React, { useEffect, useState } from 'react';
import { useEventBus } from '../../../../common-lib/eventbus/useEventBus';
import LocalComp from '../messageReceiverLocal';
const MfeRemoteComp = React.lazy(() => import('mfe/MfeRemoteComp'))

export const LocalRemoteMix = () => {
    const eventBus = useEventBus();
    const [counter, setCounter] = useState("--");
    useEffect(() => {
        eventBus.on('counterChanged', e => {
            setCounter(e.value)
        })
    }, [])

    return (<div className='page-a page'>
        <div style={{ paddingBottom: "30px", borderBottom: "1px solid #f0f0f0" }}>Local & Remote Components</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <div>
                <div style={{ padding: "20px" }}>Local Components</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <LocalComp id="1"/>
                    <LocalComp  id="2"/>
                    <LocalComp  id="3"/>
                    <LocalComp  id="4"/>
                </div>
            </div>
            <div>
                <div style={{ padding: "20px" }}>Remote Components</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <MfeRemoteComp  id="1" backgroundColor="azure"/>
                    <MfeRemoteComp  id="2" backgroundColor="azure"/>
                    <MfeRemoteComp  id="3" backgroundColor="azure"/>
                    <MfeRemoteComp  id="4" backgroundColor="azure"/>
                </div>
            </div>
        </div>
    </div>)
}