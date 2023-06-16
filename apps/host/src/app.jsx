import React, { useEffect, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import PageA from './pages/page-a';
import PageB from './pages/page-b';
import Home from './pages/home';
import './styles.css';
import { useEventBus } from '../../../common-lib/eventbus/useEventBus';
import { LocalRemoteMix } from './pages/local-remote';
import { useDispatch } from 'react-redux';
import { counterChanged } from '../../../common-lib/store/counterSlice'

const MfeRootApp = React.lazy(() => import('mfe/MfeRootApp'))

export default function App() {
  const eventBus = useEventBus()
  const [counter, setCounter] = useState(0);
  const [text, setText] = useState("");

  const dispatch = useDispatch()

  useEffect(() => {
    eventBus.dispatch('counterChanged', { value: counter });
    window.dispatchEvent(new CustomEvent('counterChanged', { detail: { value: counter } }));
    dispatch(counterChanged(counter));
  }, [counter])

  useEffect(() => {
    eventBus.dispatch('globalSearchTextChange', { value: text })
  }, [text])

  return (
    <div className="app">
      <h1>Hello World</h1>
      <h2>This the root App in Host</h2>
      <input type='text' onChange={e => setText(e.target.value)}></input>
      <button disabled={!counter} onClick={() => setCounter(x => x - 1)}>-</button> {counter} <button onClick={() => setCounter(x => x + 1)}>+</button>
      <nav className="horizontal-nav">
        <Link to="/page-a">Host/Page A</Link>
        <Link to="/page-b">Host/Page B</Link>
        <Link to="/mfe">MFE</Link>
        <Link to="/local-remote-mix">Remote + Local Components</Link>
      </nav>
      <React.Suspense fallback="Loading">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/page-a" element={<PageA />} />
          <Route path="/page-b" element={<PageB />} />
          <Route path="/local-remote-mix" element={<LocalRemoteMix />} />
          <Route path="/mfe/*" element={<MfeRootApp />} />
        </Routes>
      </React.Suspense>
    </div>);
}
