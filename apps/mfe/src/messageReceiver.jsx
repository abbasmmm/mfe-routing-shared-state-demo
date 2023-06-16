
import React, { useEffect, useState } from 'react';
import { useEventBus } from '../../../common-lib/eventbus/useEventBus';
import { useSelector } from 'react-redux';

export const messageReceiver = (props) => {
  const eventBus = useEventBus();
  const [counter, setCounter] = useState("--");
  const [customEventCounter, setCustomEventCounter] = useState("--");
  const [searchFilter, setSearchFilter] = useState("--");

  useEffect(() => {
    const d = new Date();
    eventBus.on('counterChanged', e => {
      setCounter(e.value);
    })

    window.addEventListener('counterChanged', e => {
      setCustomEventCounter(e.detail.value);
    })

    eventBus.on('globalSearchTextChange', e => {
      setSearchFilter(e.value);
    })
  }, [])

  const count = useSelector((state) => state.counter.value)

  return (
    <div style={{ padding: "10px 30px 30px", border: "1px solid #f0f0f0", borderRadius: "10px", width: "300px", backgroundColor: props.backgroundColor }}>
      <span>Remote Component {props.id} From MFE</span>

      <div className='comp-container'>
        <div>RxJs Behavior Subject Counter:</div>
        <span >{counter}</span>
        <div>Window Custom EventCounter:</div> <span > {customEventCounter}</span>
        <div> Redux Store:</div> <span > {count}</span>
      </div>
      <div className='text-section'>
        <div> Text From Host:</div><span >{searchFilter}</span>
      </div>
    </div>
  )
}

export default messageReceiver;