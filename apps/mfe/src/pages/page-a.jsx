import React, { useEffect, useState } from 'react';
import { useEventBus } from '../../../../common-lib/eventbus/useEventBus';
import { useSelector } from 'react-redux';

const PageA = () => {
  const eventBus = useEventBus();
  const [counter, setCounter] = useState("--");
  useEffect(() => {
    eventBus.on('counterChanged', e => {
      setCounter(e.value)
    })
  }, [])

  const count = useSelector((state) => state.counter.value)

  return (
    <div className='page-a page'>
      This is page A in remote mfe
      <h1>Counter: {counter}</h1>
    </div>
  )
}

export default PageA;