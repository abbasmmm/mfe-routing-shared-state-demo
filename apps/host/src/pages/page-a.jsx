import React, { useEffect, useState } from 'react';
import { useEventBus } from '../../../../common-lib/eventbus/useEventBus';

const PageA = () => {
  const eventBus = useEventBus();
  const [counter, setCounter] = useState("--");
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    eventBus.on('counterChanged', e => {
      setCounter(e.value)
    });

    eventBus.on('globalSearchTextChange', e => {
      setSearchFilter(e.value);
    })
  }, [])

  return (
    <div className='page-a page'>
      This is page A in Host
      <br />

      <div>
        Counter: <span style={{ color: 'gray' }}>{counter}</span> <br />
        Text: <span style={{ color: 'gray' }}>{searchFilter}</span>
      </div>
    </div>
  )
}

export default PageA;